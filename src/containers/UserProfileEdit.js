import React from 'react'
import '../../node_modules/bootstrap/js/dist/dropdown.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import '../styles/test.css'
import '../styles/user.css'
import logo from '../resources/background/logo.jpg'
import user from '../resources/icons/user.png'
import userlogin from '../resources/account/userlogin.png'

import UserServiceClient from "../services/UserServiceClient";
import {isEmpty, isLength, isContainWhiteSpace, isEmail} from '../constants/validator'

export default class UserProfileEdit
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false, // Indicates in progress state of login form
            user:{}
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

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.newPassword)) {
            errors.password = "Password can't be blank";
        }  else if (isContainWhiteSpace(formData.newPassword)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.newPassword, { gte: 6, lte: 16, trim: true })) {
            errors.password = "Password's length must between 6 to 16";
        }
        if(formData.password !== this.state.user.password) {
            errors.password = "Password is not correct"
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    update = (e) => {

        e.preventDefault();

        let errors = this.validateLoginForm();

        if(errors === true){
            var newUser = this.state.user;
            newUser.password = this.state.formData.newPassword;
            this.userService.updateAccountInfoForUser(this.state.user.id, newUser);
        } else {
            alert(errors.email || errors.password);
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    logout = (e) => {
        this.userService.logout();
    }

    render() {
        if (this.state.user === undefined || this.state.user === {}) {
            window.location.href = "/home";
        }
        return (
            <div id="profile-page" className="user-page">
                <nav className="navbar navbar-light sticky-top">
                    <a className="navbar-brand mt-2" href="/home">
                        <img src={logo} width="47" height="35"
                             className="mr-3 d-inline-block align-top" alt=""/>
                        FOOD TRUCK MAPPER
                    </a>
                    <span className="nav-item dropdown" id="user-icon">
                        <a className="nav-item dropdown dropdown-toggle" id="navbarDropdownMenuLink" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={user} width="14" height="14" className="d-inline-block" alt=""/>
                        </a>
                        {this.state.user !== undefined
                        && <a className="nav-item current-user">{this.state.user.email}</a>}
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {this.state.user !== undefined
                            && <a className="dropdown-item" href="/home" onClick={this.logout}>Log Out</a>}
                        </div>
                    </span>
                </nav>
                <div className="container-fluid" id="profile-container">
                    <div id="profile-edit" className="user-page-card">
                        <h1 className="display1">User Profile</h1>
                        <div className="tab-row row">
                            <span className="profile-tab1 profile-tab"><a
                                href="/profile/user">Info and Setting</a></span>
                            <span className="profile-tab2 profile-tab">Manage Password</span>
                        </div>


                        <form action="" method="" className="" role="form" onSubmit={this.update}>
                            <div id="form-register-password" className="form-group">
                                <p className="profile-title">Old Password</p>
                                <input id="register-passwd" className="form-control" name="password" type="password"
                                       size="14" alt="password" placeholder="Enter Current Password"
                                       onChange={this.handleInputChange} required/>
                            </div>
                            <div id="form-register-password-retype" className="form-group">
                                <p className="profile-title">New Password</p>
                                <input id="register-passwd-retype" className="form-control" name="newPassword"
                                       type="password"
                                       size="14" alt="password" placeholder="Set New Password"
                                       onChange={this.handleInputChange} required/>
                            </div>
                            <div>
                                <button className="btn btn-block ripple-effect" type="submit" name="Submit"
                                        alt="sign in">Change
                                </button>
                            </div>
                        </form>
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
