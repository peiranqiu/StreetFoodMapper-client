import React from 'react'
import '../../node_modules/bootstrap/js/dist/dropdown.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import '../styles/test.css'
import '../styles/user.css'
import logo from '../resources/background/logo-red.png'
import user from '../resources/icons/user-white.png'
import venderlogin from '../resources/account/vendorlogin.png'
import {isEmail, isEmpty, isLength, isContainWhiteSpace} from '../constants/validator'

import OwnerServiceClient from "../services/OwnerServiceClient";

export default class OwnerLogin
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false, // Indicates in progress state of login form
            owner: {}
        }
        this.ownerService = OwnerServiceClient.instance();
    }

    componentDidMount() {
        this.ownerService.findCurrentOwner()
            .then(owner => {
                this.setState({owner: owner});
            });
    }

    componentWillReceiveProps() {
        this.ownerService.findCurrentOwner()
            .then(owner => {
                this.setState({owner: owner});
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
            this.ownerService.login({email: this.state.formData.email, password: this.state.formData.password});
        } else {
            alert(errors.email || errors.password);
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }


    render() {
        if (this.state.owner !== undefined && this.state.owner.email !== undefined) {
            window.location.href = "/dashboard";
        }
        return (
            <div id="vendor-login-page" className="vendor-page user-page">
                <nav className="navbar navbar-light sticky-top">
                    <a className="navbar-brand mt-2" href="/dashboard">
                        <img src={logo} width="47" height="35"
                             className="mr-3 d-inline-block align-top" alt=""/>
                        FOOD TRUCK MAPPER
                    </a>
                    <span className="nav-item dropdown" id="user-icon">
                        <a className="nav-item dropdown dropdown-toggle" id="navbarDropdownMenuLink" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={user} width="14" height="14" className="d-inline-block" alt=""/>
                        </a>
                    </span>
                </nav>
                <div className="container-fluid" id="login-container">
                    <div className="row">
                        <div className="col-sm-6 container vendor-login-form">
                            <div id="login" className="user-page-card">
                                <h1 className="display1">Welcome Back!</h1>
                                <p className="subhead">Don’t have an account yet?
                                    <a href="/register/owner"> Sign up</a> in seconds.</p>
                                <form action="" method="" className="" role="form" onSubmit={this.login}>
                                    <div id="form-login-email" className="form-group">
                                        <input id="login-email" className="form-control" name="email" type="text"
                                               size="14"
                                               alt="EMAIL" placeholder="Eamil"
                                               onChange={this.handleInputChange}
                                               required/>
                                    </div>
                                    <div id="form-login-password" className="form-group">
                                        <input id="login-passwd" className="form-control" name="password"
                                               type="password"
                                               size="14" alt="password" placeholder="Password"
                                               onChange={this.handleInputChange}
                                               required/>
                                    </div>
                                    <div>
                                        <button className="btn btn-block ripple-effect" type="submit" name="Submit"
                                                alt="sign in">Log In
                                        </button>
                                    </div>
                                    <p className="bottom-text">By signing up you agree to Food Truck Mapper's Terms of
                                        Service and Privacy Policy.</p>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-6"><img className="user-page-img" src={venderlogin} alt="userlogin"/>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-light sticky-bottom">
                    <a className="navbar-brand">©2018 All Rights Reserved.</a>
                    <a className="nav-item" id="nav-item-2" href="mailto:joannfeng89@gmail.com?Subject=Hello">Contact
                        Us</a>
                    <a className="nav-item" id="nav-item-3" href="/register/owner">Vendor?</a>
                </nav>
            </div>
        );
    }
}
