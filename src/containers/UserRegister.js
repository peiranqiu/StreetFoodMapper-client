import React from 'react'
import '../../node_modules/bootstrap/js/dist/dropdown.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import '../styles/test.css'
import '../styles/user.css'
import logo from '../resources/background/logo.jpg'
import user from '../resources/icons/user.png'
import userregister from '../resources/account/userregister.png'

import UserServiceClient from "../services/UserServiceClient";

export default class UserRegister
    extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };

        this.userService = UserServiceClient.instance();

        this.termChanged = this.termChanged.bind(this);
    }

    componentDidMount() {
        this.userService.findCurrentUser()
            .then(user => {
                this.setState({user: user});
            });
    }

    componentWillReceiveProps(newProps) {
        this.userService.findCurrentUser()
            .then(user => {
                this.setState({user: user});
            });
    }

    termChanged(event) {
        this.setState({term: event.target.value});
    }

    logout() {
        this.userService.logout();
    }

    render() {
        return (
            <div id="register-page" className="user-page">
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
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {this.props.user === undefined
                            && <a className="dropdown-item" href="/login/user">Log In</a>}
                            {this.props.user === undefined
                            && <a className="dropdown-item" href="/register/user">Register</a>}
                            {this.props.user !== undefined
                            && <a className="dropdown-item" href="/profile/user/${this.props.user.id}">Profile</a>}
                            {this.props.user !== undefined
                            && <a className="dropdown-item" href="/home" onClick={() => this.logout()}>Log Out</a>}


                        </div>
                    </span>
                </nav>
                <div className="container-fluid" id="register-container">
                    <div className="row">
                        <div class="col-sm-6 container user-register-form">
                            <div id="register" class="user-page-card">
                                <h1 class="display1">Sign Up</h1>
                                <p class="subtitle">Connect with great local food trucks and access your favorite food truck list, on-the-go.</p>
                                <p className="subhead">Already on Food Truck Mapper?
                                    <a href="/login/user"> Sign in</a></p>
                                <form action="" method="" class="" role="form">
                                    <div id="form-register-username" class="form-group">
                                        <input id="register-email" class="form-control" name="email" type="text" size="14"
                                               alt="EMAIL" placeholder="Eamil" required/>
                                    </div>
                                    <div id="form-register-password" class="form-group">
                                        <input id="register-passwd" class="form-control" name="password" type="password"
                                               size="14" alt="password" placeholder="Password" required/>
                                    </div>
                                    <div id="form-register-password-retype" className="form-group">
                                        <input id="register-passwd" className="form-control" name="password"
                                               type="password"
                                               size="14" alt="password" placeholder="Re-type Password" required/>
                                    </div>
                                    <div>
                                        <button class="btn btn-block ripple-effect" type="submit" name="Submit"
                                                alt="sign in">Log In
                                        </button>
                                    </div>
                                    <p className="bottom-text">By signing up you agree to Food Truck Mapper's Terms of Service and Privacy Policy.</p>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-6"><img className="user-page-img" src={userregister} alt="userlogin"/>
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
