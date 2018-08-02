import React from 'react'
import '../../node_modules/bootstrap/js/dist/dropdown.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import '../styles/test.css'
import '../styles/user.css'
import '../styles/truck.css'
import logo from '../resources/background/logo-red.png'
import user from '../resources/icons/user-white.png'
import OwnerServiceClient from "../services/OwnerServiceClient";

export default class Dashboard
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
        this.ownerService.logout();
    }

    render() {
        if (this.state.owner === undefined || this.state.owner === {}) {
            window.location.href = "/register/vendor";
        }

        var content = (
            <div id="dashboard" className="user-page-card">
                <div className="list-group">
                    <a className="list-group-item list-group-item-action flex-column align-items-start" id="new-truck">
                        <div className="row justify-content-between">
                            <div>You don’t have any truck profiles set up yet.</div>
                            <button className="btn btn-block ripple-effect" alt="">Add Your First Truck</button>
                        </div>
                    </a>
                </div>
            </div>);

        if (this.state.owner.trucks !== undefined && this.state.owner.trucks.length > 0) {
            content = (
                <div id="dashboard" className="card-group">
                    <a className="create-truck">Add New Truck</a>
                    <div className="row">
                        {this.state.owner.trucks.map((truck) => {
                            return (
                                <div className="col-6" key={truck.id}>
                                    <div className="truck-card card border-0">
                                        <img className="truck-item-img"
                                             src={truck.photos[0].href}/>
                                        <div className="truck-item-title">{truck.name}</div>
                                        <button className="btn btn-block ripple-effect" alt="">Edit
                                        </button>
                                        <a className="delete-truck">Delete</a>
                                    </div>
                                </div>

                            );
                        })}
                    </div>
                </div>
            );
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
                            && <a className="dropdown-item" href="/profile/owner">Profile</a>}
                            {this.state.owner !== undefined
                            && <a className="dropdown-item" href="/home" onClick={this.logout}>Log Out</a>}
                        </div>
                    </span>
                </nav>
                <div className="container-fluid" id="dashboard-container">
                    <h1 className="display1">Vendor Dashboard</h1>
                    {content}
                </div>
                <nav className="navbar navbar-light sticky-bottom">
                    <a className="navbar-brand" href="/policy">
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
