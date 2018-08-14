import React from 'react'
import '../../node_modules/bootstrap/js/dist/dropdown.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import '../styles/test.css'
import '../styles/user.css'
import logo from '../resources/background/logo.png'
import user from '../resources/icons/user.png'
import userlogin from '../resources/account/userlogin.png'

import UserServiceClient from "../services/UserServiceClient";
import {isEmail, isEmpty, isLength, isContainWhiteSpace} from '../constants/validator'

export default class UserLogin
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false, // Indicates in progress state of login form
            user: {}
        }
        this.userService = UserServiceClient.instance();
    }

    componentDidMount() {
        this.userService.findCurrentUser()
            .then(user => {
                this.setState({user: user});
            });
    }

    componentWillReceiveProps() {
        this.userService.findCurrentUser()
            .then(user => {
                this.setState({user: user});
            });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let {formData} = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {

        let errors = {};
        const {formData} = this.state;

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    login = (e) => {

        e.preventDefault();

        let errors = this.validateLoginForm();

        if (errors === true) {
            this.userService.login({email: this.state.formData.email, password: this.state.formData.password});

        }
        else {
            alert(errors.email || errors.password);
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    render() {
        if (this.state.user !== undefined && this.state.user.email !== undefined) {
            if(this.state.user.email === "admin") {
                window.location.href = "/admin";
            }
            else {
                window.location.href = "/home";
            }
        }
        return (
            <div id="login-page" className="user-page">
                <nav className="navbar navbar-light sticky-top">
                    <a className="navbar-brand mt-2" href="/home">
                        <img src={logo} width="106.4" height="38"
                             className="mr-3 d-inline-block align-top" alt=""/>
                    </a>
                </nav>
                <div className="container-fluid" id="login-container">
                    <div className="row">
                        <div className="col-sm-6 container user-login-form">
                            <div id="login" className="user-page-card">
                                <h1 className="display1">Welcome Back!</h1>
                                <p className="subhead">Don’t have an account yet?
                                    <a href="/register/user"> Sign up</a> in seconds.</p>
                                <form action="" method="" className="" role="form" onSubmit={this.login}>
                                    <div id="form-login-username" className="form-group">
                                        <input id="email" className="form-control" name="email" type="text" size="14"
                                               alt="EMAIL" placeholder="Eamil"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div id="form-login-password" className="form-group">
                                        <input id="passwd" className="form-control" name="password" type="password"
                                               size="14" alt="password" placeholder="Password"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div>
                                        <button className="btn btn-block ripple-effect" type="submit" name="Submit"
                                                alt="sign in">Log In
                                        </button>
                                    </div>
                                    <p className="bottom-text">By logging in you agree to Street Food Mapper's <a href="/policy">Privacy Policy</a>.</p>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-6"><img className="user-page-img" src={userlogin} alt="userlogin"/>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-light sticky-bottom">
                    <a className="navbar-brand">
                        ©2018 All Rights Reserved.
                    </a>
                    <a className="nav-item" id="nav-item-2" href="mailto:streetfoodmapper@gmail.com?Subject=Hello">Contact
                        Us</a>
                    <a className="nav-item" id="nav-item-3" href="/register/owner">Vendor?</a>
                </nav>
            </div>
        );
    }
}
