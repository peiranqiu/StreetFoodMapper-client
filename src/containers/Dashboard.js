import React from 'react'
import '../../node_modules/bootstrap/js/dist/dropdown.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import '../styles/test.css'
import '../styles/user.css'
import '../styles/truck.css'
import '../styles/dashboard.css'
import logo from '../resources/background/logo-red.png'
import user from '../resources/icons/user-white.png'
import OwnerServiceClient from "../services/OwnerServiceClient";
import TruckServiceClient from "../services/TruckServiceClient"

export default class Dashboard
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: {},
            trucks: []
        }
        this.ownerService = OwnerServiceClient.instance();
        this.truckService = TruckServiceClient.instance();
    }

    componentDidMount() {
        this.ownerService.findCurrentOwner()
            .then(owner => {
                this.setState({owner: owner});
                this.truckService.findTrucksForOwner(owner.id)
                    .then(trucks => {
                        this.setState({trucks: trucks});
                    });
            });

    }

    logout = (e) => {
        this.ownerService.logout();
    }

    delete(id) {
        if (window.confirm('Delete Truck?')) {
            this.truckService.deleteTruck(id);
        }
        window.location.reload();
    }

    render() {
        if (this.state.owner === undefined || this.state.owner === {}) {
            alert("Plase Log In");
            window.location.href = "/login/owner";
        }

        var content = (
            <div id="dashboard" className="card-group">
                <div className="list-group">
                    <div className="list-group-item list-group-item-action flex-column align-items-start"
                         id="new-truck">
                        <div className="row justify-content-between">
                            <div>You don’t have any truck profiles set up yet.</div>
                            <button type="button" className="btn btn-block ripple-effect"
                                    onClick={() => {
                                        window.location.href = "/dashboard/create"
                                    }}>
                                Add Your First Truck
                            </button>
                        </div>
                    </div>
                </div>
            </div>);

        if (this.state.trucks !== undefined && this.state.trucks.length > 0) {
            this.truckService.deleteTruck(this.state.trucks[0].id);
            content = (
                <div id="dashboard" className="card-group">
                    <a className="create-truck" href="/dashboard/create">Add New Truck</a>
                    <div className="row">
                        {this.state.trucks.map((truck) => {
                            var href = "/truck/" + truck.id + "/edit";
                            return (
                                <div className="col-6" key={truck.id}>
                                    <div className="truck-card card border-0">
                                        <img className="truck-item-img"
                                             src={truck.photos[0].href}/>
                                        <div className="truck-item-title">{truck.name}</div>
                                        <button className="btn btn-block ripple-effect" alt=""
                                                onClick={() => {
                                                    window.location.href = href
                                                }}>Edit
                                        </button>
                                        <a className="delete-truck" onClick={() => this.delete(truck.id)}>Delete</a>
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
