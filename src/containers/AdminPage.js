import React from 'react'
import '../../node_modules/bootstrap/js/dist/dropdown.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import '../styles/test.css'
import '../styles/user.css'
import '../styles/admin.css'
import '../styles/dashboard.css'
import logo from '../resources/background/logo.png'
import user from '../resources/icons/user.png'
import {Modal, Button} from 'bootstrap'
import UserServiceClient from "../services/UserServiceClient";
import OwnerServiceClient from "../services/OwnerServiceClient";
import TruckServiceClient from "../services/TruckServiceClient";
import $ from "jquery";

const ids = [];

export default class AdminPage
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            allUsers: [],
            allOwners: [],
            edit: null,
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false, // Indicates in progress state of login form
            validate: false
        }
        this.userService = UserServiceClient.instance();
        this.ownerService = OwnerServiceClient.instance();
        this.truckService = TruckServiceClient.instance();
    }

    componentDidMount() {
        this.userService.findCurrentUser()
            .then(user => {
                this.setState({user: user});
                if (user === undefined || user.email !== "admin") {
                    alert("Please log in as admin to access this page");
                    window.location.href = "/home";
                }
            });
        this.userService.findAllUsers()
            .then((users) => {
                console.log(users);
                this.setState({allUsers: users});
            });
        this.ownerService.findAllOwners()
            .then((owners) => {
                this.setState({allOwners: owners});
            });
    }

    deleteTruck(id) {
        if (window.confirm('Are you sure you want to delete this truck?\nThis action is permanent and cannot be undone.')) {
            this.truckService.deleteTruck(id);
            window.location.reload();
        }
    }

    deleteUser(id) {
        if (window.confirm('Are you sure you want to delete this user?\nThis action is permanent and cannot be undone.')) {
            this.userService.deleteUser(id);
            window.location.reload();
        }
    }

    deleteOwner(id) {
        if (window.confirm('Are you sure you want to delete this vendor?\nThis action is permanent and cannot be undone.')) {
            this.ownerService.deleteOwner(id);
            window.location.reload();
        }
    }

    logout = (e) => {
        if (window.confirm('Are you sure you want to log out?')) {
            this.userService.logout();
            window.location.href = "/home";
        }
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

    updateUser = (e) => {
        e.preventDefault();
        this.userService.updateAccountInfoForUser(
            this.state.edit.id, {email: this.state.edit.email, password: this.state.edit.password});
        this.setState({edit: null});
        $('.modal').modal('hide');
    }

    updateOwner = (e) => {
        e.preventDefault();
        this.ownerService.updateAccountInfoForOwner(
            this.state.edit.id, {email: this.state.edit.email, password: this.state.edit.password});
        this.setState({edit: null});
        $('.modal').modal('hide');
    }

    createUser = (e) => {
        e.preventDefault();
        this.userService.createUser({email: this.state.edit.email, password: this.state.edit.password})
            .then((response) => {
                if (response !== null) {
                    alert("User Created");
                    window.location.reload();
                }
            });
        this.setState({edit: null});
        $('.modal').modal('hide');
    }

    createOwner = (e) => {
        e.preventDefault();
        this.ownerService.register({email: this.state.edit.email, password: this.state.edit.password})
            .then((response) => {
                if (response !== null) {
                    alert("Vendor Created");
                    window.location.reload();
                }
            });
        this.setState({edit: null});
        $('.modal').modal('hide');
    }

    render() {
        var newTruckModal = (
            <div className="modal fade ripple-effect" id="newTruckModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header"><h5 className="modal-title" id="exampleModalLabel">Set Truck
                            Owner</h5>
                        </div>
                        <div className="modal-body">
                            <form action="" method="" className="" role="form">
                                <div className="form-group">
                                    <input className="form-control" id="edit-email"
                                           placeholder="Enter Vendor ID" name="email" type="text" size="14" alt="email"
                                           onChange={(e) => this.setState({edit: e.target.value})} required/></div>
                                <button className="btn yelp-btn" type="button"
                                        onClick={() => {
                                            if (ids.includes(parseInt(this.state.edit))) {
                                                if (window.confirm('Creating a truck for vendor with id ' + this.state.edit + "?")) {
                                                    this.setState({edit: null});
                                                    $('.modal').modal('hide');
                                                    window.open("/" + this.state.edit + "/create", '_blank')
                                                }
                                            }
                                            else {
                                                alert("No vendor with this id found");
                                            }
                                        }}>Continue
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
        var userModal = (
            <div className="modal fade ripple-effect" id="userModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header"><h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
                        </div>
                        <div className="modal-body">
                            <form action="" method="" className="" role="form" onSubmit={this.updateUser}>
                                <div className="form-group">
                                    <input className="form-control" id="edit-email"
                                           defaultValue={this.state.edit !== null ? this.state.edit.email : ""}
                                           name="email" type="text" size="14"
                                           alt="email" onChange={(e) => {
                                        var edit = this.state.edit;
                                        edit.email = e.target.value;
                                        this.setState({edit: edit});
                                        this.handleInputChange(e);
                                    }} required/>
                                    <input className="form-control" id="edit-password"
                                           defaultValue={this.state.edit !== null ? this.state.edit.password : ""}
                                           name="password" type="text" size="14"
                                           alt="password" onChange={(e) => {
                                        var edit = this.state.edit;
                                        edit.password = e.target.value;
                                        this.setState({edit: edit});
                                        this.handleInputChange(e);
                                    }} required/></div>
                                <button type="submit" className="btn yelp-btn" name="Submit">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
        var createUserModal = (
            <div className="modal fade ripple-effect" id="createUserModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header"><h5 className="modal-title" id="exampleModalLabel">Create
                            User</h5>
                        </div>
                        <div className="modal-body">
                            <form action="" method="" className="" role="form" onSubmit={this.createUser}>
                                <div className="form-group">
                                    <input className="form-control" id="edit-email"
                                           placeholder="Email"
                                           name="email" type="text" size="14"
                                           alt="email" onChange={(e) => {
                                        var edit = this.state.edit;
                                        edit.email = e.target.value;
                                        this.setState({edit: edit});
                                        this.handleInputChange(e);
                                    }} required/>
                                    <input className="form-control" id="edit-password"
                                           placeholder="Password"
                                           name="password" type="text" size="14"
                                           alt="password" onChange={(e) => {
                                        var edit = this.state.edit;
                                        edit.password = e.target.value;
                                        this.setState({edit: edit});
                                        this.handleInputChange(e);
                                    }} required/></div>
                                <button type="submit" className="btn yelp-btn" name="Submit">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
        var ownerModal = (
            <div className="modal fade ripple-effect" id="ownerModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header"><h5 className="modal-title" id="exampleModalLabel">Edit
                            Vendor</h5>
                        </div>
                        <div className="modal-body">
                            <form action="" method="" className="" role="form" onSubmit={this.updateOwner}>
                                <div className="form-group">
                                    <input className="form-control" id="edit-email"
                                           defaultValue={this.state.edit !== null ? this.state.edit.email : ""}
                                           name="email" type="text" size="14"
                                           alt="email" onChange={(e) => {
                                        var edit = this.state.edit;
                                        edit.email = e.target.value;
                                        this.setState({edit: edit});
                                        this.handleInputChange(e);
                                    }} required/>
                                    <input className="form-control" id="edit-password"
                                           defaultValue={this.state.edit !== null ? this.state.edit.password : ""}
                                           name="password" type="text" size="14"
                                           alt="password" onChange={(e) => {
                                        var edit = this.state.edit;
                                        edit.password = e.target.value;
                                        this.setState({edit: edit});
                                        this.handleInputChange(e);
                                    }} required/></div>
                                <button type="submit" className="btn yelp-btn" name="Submit">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
        var createOwnerModal = (
            <div className="modal fade ripple-effect" id="createOwnerModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header"><h5 className="modal-title" id="exampleModalLabel">Create
                            Owner</h5>
                        </div>
                        <div className="modal-body">
                            <form action="" method="" className="" role="form" onSubmit={this.createOwner}>
                                <div className="form-group">
                                    <input className="form-control" id="edit-email"
                                           placeholder="Email"
                                           name="email" type="text" size="14"
                                           alt="email" onChange={(e) => {
                                        var edit = this.state.edit;
                                        edit.email = e.target.value;
                                        this.setState({edit: edit});
                                        this.handleInputChange(e);
                                    }} required/>
                                    <input className="form-control" id="edit-password"
                                           placeholder="Password"
                                           name="password" type="text" size="14"
                                           alt="password" onChange={(e) => {
                                        var edit = this.state.edit;
                                        edit.password = e.target.value;
                                        this.setState({edit: edit});
                                        this.handleInputChange(e);
                                    }} required/></div>
                                <button type="submit" className="btn yelp-btn" name="Submit">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
        return (
            <div id="profile-page" className="user-page">
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
                        {this.state.user !== undefined
                        && <a className="nav-item current-user">{this.state.user.email}</a>}
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {this.state.user !== undefined
                            && <a className="dropdown-item" onClick={this.logout}>Log Out</a>}
                            </div>
                    </span>
                </nav>
                <div className="container-fluid py-5" id="admin-container">
                    <div className="container admin-user-container">
                        <h2 className="truck-page-title">Users
                            <i className="fa fa-plus ml-3"
                               onClick={() => {
                                   this.setState({edit: {email: "", password: ""}});
                                   $('#createUserModal').modal('show');
                               }}/></h2>
                        {userModal}{createUserModal}
                        <table className="table table-striped user-table">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col" className="tool"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.allUsers.map((user) => (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>
                                        <i className="fa fa-pencil mr-3"
                                           onClick={() => {
                                               this.setState({edit: user});
                                               $('#userModal').modal('show');
                                           }}/>
                                        <i className="fa fa-times"
                                           onClick={() => this.deleteUser(user.id)}/>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="container admin-owner-container">
                        <h2 className="truck-page-title">Vendors
                            <i className="fa fa-plus ml-3"
                               onClick={() => {
                                   this.setState({edit: {email: "", password: ""}});
                                   $('#createOwnerModal').modal('show');
                               }}/></h2>
                        {ownerModal}{createOwnerModal}
                        <table className="table table-striped owner-table">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col" className="tool"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.allOwners.map((owner) => {
                                ids.push(owner.id);
                                console.log(owner.trucks);
                                return (
                                    <tr key={owner.id}>
                                        <th scope="row">{owner.id}</th>
                                        <td>{owner.email}</td>
                                        <td>{owner.password}</td>
                                        <td>
                                            <i className="fa fa-pencil mr-3"
                                               onClick={() => {
                                                   this.setState({edit: owner});
                                                   $('#ownerModal').modal('show');
                                               }}/>
                                            <i className="fa fa-times"
                                               onClick={() => this.deleteOwner(owner.id)}/>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className="container admin-truck-container">
                        <h2 className="truck-page-title">Trucks
                            <i className="fa fa-plus ml-3"
                               onClick={() => {
                                   $('#newTruckModal').modal('show');
                               }}/></h2>
                        {newTruckModal}
                        <table className="table table-striped truck-table">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Vendor</th>
                                <th scope="col">Website</th>
                                <th scope="col">Menu</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Twitter</th>
                                <th scope="col">Category1</th>
                                <th scope="col">Category2</th>
                                <th scope="col">Category3</th>
                                <th scope="col" className="tool-icon"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.allOwners.map((owner) => (
                                owner.trucks.map((truck) => (
                                    <tr key={truck.id}>
                                        <th scope="row">{truck.id}</th>
                                        <td>{truck.name}</td>
                                        <td>{owner.id}</td>
                                        <td>{truck.website}</td>
                                        <td>{truck.menu}</td>
                                        <td>{truck.phone}</td>
                                        <td>{truck.twitter}</td>
                                        <td>{truck.category1}</td>
                                        <td>{truck.category2}</td>
                                        <td>{truck.category3}</td>
                                        <td className="tool-icon">
                                            <i className="fa fa-pencil mr-3"
                                               onClick={() => window.open("/truck/" + truck.id + "/edit", '_blank')}/>
                                            <i className="fa fa-times mr-3"
                                               onClick={() => this.deleteTruck(truck.id)}/>
                                            <i className="fa fa-eye"
                                               onClick={() => window.open("/truck/" + truck.id, '_blank')}/>
                                        </td>
                                    </tr>
                                ))
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <nav className="navbar navbar-light sticky-bottom">
                    <a className="navbar-brand">
                        ©2018 All Rights Reserved.
                    </a>
                </nav>
            </div>
        );
    }
}
