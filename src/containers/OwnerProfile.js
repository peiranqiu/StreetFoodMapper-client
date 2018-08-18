import React from 'react'
import '../../node_modules/bootstrap/js/dist/dropdown.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import '../styles/test.css'
import '../styles/user.css'
import logo from '../resources/background/logo-red.png'
import user from '../resources/icons/user-white.png'
import OwnerServiceClient from "../services/OwnerServiceClient";

export default class OwnerProfile
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    logout = (e) => {
        if (window.confirm('Are you sure you want to log out?')) {
            this.ownerService.logout();
            window.location.href = "/home";
        }
    }

    render() {
        if (this.state.owner === undefined || this.state.owner === {}) {
            window.location.href = "/home";
        }
        return (
            <div id="profile-page" className="user-page vendor-page">
                <nav className="navbar navbar-light sticky-top">
                    <a className="navbar-brand mt-2" href="/dashboard">
                        <img src={logo} width="100" height="38"
                             className="mr-3 d-inline-block align-top" alt=""/>
                    </a>
                    <span className="nav-item dropdown" id="user-icon">
                        <a className="nav-item dropdown dropdown-toggle" id="navbarDropdownMenuLink" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={user} width="14" height="14" className="d-inline-block" alt=""/>
                        </a>
                        {this.state.owner !== undefined
                        && <a className="nav-item current-user">{this.state.owner.email}</a>}
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {this.state.owner !== undefined
                            && <a className="dropdown-item" onClick={this.logout}>Log Out</a>}


                        </div>
                    </span>
                </nav>
                <div className="container-fluid" id="profile-container">
                    <div id="profile" className="user-page-card">
                        <h1 className="display1">User Profile</h1>
                        <div className="tab-row row">
                            <span className="profile-tab1 profile-tab">Info and Setting</span>
                            <span className="profile-tab2 profile-tab"><a href="/profile/owner/edit">Manage Password</a></span>
                        </div>
                        <p className="profile-title">Email</p>
                        {this.state.owner !== undefined && <p className="profile-content">{this.state.owner.email}</p>}
                    </div>
                </div>
                <nav className="navbar navbar-light sticky-bottom">
                    <a className="navbar-brand">
                        ©2018 All Rights Reserved.
                    </a>
                    <a className="nav-item" id="nav-item-2" href="mailto:streetfoodmapper@gmail.com?Subject=Hello">Contact
                        Us</a>
                    <a className="nav-item" id="nav-item-3" href="/register/user">Foodie?</a>
                </nav>
            </div>
        );
    }
}
