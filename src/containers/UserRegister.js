import React from 'react'
import '../../node_modules/bootstrap/js/dist/dropdown.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import '../styles/test.css'
import '../styles/user.css'
import logo from '../resources/background/logo.png'
import user from '../resources/icons/user.png'
import userregister from '../resources/account/userregister.png'

import UserServiceClient from "../services/UserServiceClient";
import {isEmail, isEmpty, isLength, isContainWhiteSpace} from '../constants/validator'

export default class UserRegister
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

        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        } else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, {gte: 6, lte: 16, trim: true})) {
            errors.password = "Password's length must between 6 to 16";
        }
        if (formData.password !== formData.passwordRetype) {
            errors.password = "Password does not match"
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    register = (e) => {

        e.preventDefault();

        let errors = this.validateLoginForm();

        if (errors === true) {
            this.userService.register({email: this.state.formData.email, password: this.state.formData.password})
                .then((response) => {
                    if (response !== null) {
                        alert("Sign up successful!\n" +
                            "Now you can sign in to bookmark and access your favorite food trucks.");
                        window.location.reload();
                    }
                });
        } else {
            alert(errors.email || errors.password);
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    render() {
        if (this.state.user !== undefined && this.state.user.email !== undefined) {
            window.location.href = "/home";
        }
        return (
            <div id="register-page" className="user-page">
                <nav className="navbar navbar-light sticky-top">
                    <a className="navbar-brand mt-2" href="/home">
                        <img src={logo} width="106.4" height="38"
                             className="mr-3 d-inline-block align-top" alt=""/>
                    </a>
                    <span className="nav-item dropdown" id="user-icon">
                        <a className="nav-item dropdown dropdown-toggle" id="navbarDropdownMenuLink" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={user} width="14" height="14" className="d-inline-block" alt=""/>
                        </a>
                    </span>
                </nav>
                <div className="container-fluid" id="register-container">
                    <div className="row">
                        <div className="col-sm-6 container user-register-form">
                            <div id="register" className="user-page-card">
                                <h1 className="display1">Sign Up</h1>
                                <p className="subtitle">Connect with great local food trucks and access your favorite
                                    food truck list, on-the-go.</p>
                                <p className="subhead">Already on Food Truck Mapper?
                                    <a href="/login/user"> Sign in</a></p>
                                <form action="" method="" className="" role="form" onSubmit={this.register}>
                                    <div id="form-register-username" className="form-group">
                                        <input id="register-email" className="form-control" name="email" type="text"
                                               size="14"
                                               alt="EMAIL" placeholder="Eamil" onChange={this.handleInputChange}
                                               required/>
                                    </div>
                                    <div id="form-register-password" className="form-group">
                                        <input id="register-passwd" className="form-control" name="password"
                                               type="password"
                                               size="14" alt="password" placeholder="Password"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div id="form-register-password-retype" className="form-group">
                                        <input id="register-passwd-retype" className="form-control"
                                               name="passwordRetype"
                                               type="password"
                                               size="14" alt="password" placeholder="Re-type Password"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div>
                                        <button className="btn btn-block ripple-effect" type="submit" name="Submit"
                                                alt="sign in">Log In
                                        </button>
                                    </div>
                                    <p className="bottom-text">By signing up you agree to Street Food Mapper's <a
                                        href="/policy">Privacy Policy</a>.</p>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-6"><img className="user-page-img" src={userregister} alt="userlogin"/>
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
