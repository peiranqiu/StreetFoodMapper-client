import React from 'react'
import '../../node_modules/bootstrap/js/dist/dropdown.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import { Modal, Button } from 'bootstrap'
import $ from 'jquery'
import '../styles/test.css'
import '../styles/user.css'
import '../styles/truck.css'
import '../styles/dashboard.css'
import logo from '../resources/background/logo-red.png'
import user from '../resources/icons/user-white.png'
import OwnerServiceClient from "../services/OwnerServiceClient";
import YelpServiceClient from "../services/YelpServiceClient";
import { isEmpty, isLength, isContainWhiteSpace } from '../constants/validator'

export default class CreateTruck
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false, // Indicates in progress state of login form
            owner: {},
            newTruck:{}
        }
        this.ownerService = OwnerServiceClient.instance();
        this.yelpService = YelpServiceClient.instance();
    }

    componentDidMount() {
        this.ownerService.findCurrentOwner()
            .then(owner => {
                this.setState({owner: owner});
            });
        $('.modal').modal('show');
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

        if (isEmpty(formData.email) || isContainWhiteSpace(formData.email)
            || !isLength(formData.email, { gte: 12, lte: 12, trim: true })) {
            errors.email = "Phone number should be in the format +1XXXXXXXXXX";
        };

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    findTruckByPhone = (e) => {

        e.preventDefault();

        let errors = this.validateLoginForm();

        if(errors === true){
            this.yelpService.findTruckByPhone(this.state.formData.email).then((truck) => {
                if(truck !== false) {
                    this.setState({newTruck: truck});
                    $('.modal').modal('hide');
                }})
        } else {
            alert(errors.email);
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }


    logout = (e) => {
        this.ownerService.logout();
    }

    render() {


        var modal = (
            <div className="modal fade ripple-effect" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Yelp Connect</h5>
                        </div>
                        <div className="modal-body">
                            <form action="" method="" className="" role="form" onSubmit={this.findTruckByPhone}>
                                <div className="form-group">
                                    <div htmlFor="recipient-name" className="col-form-label">
                                        Create your truck page faster by entering the phone number associated with your Yelp business page.
                                    </div>
                                    <input className="form-control" id="recipient-name" placeholder="+1XXXXXXXXXX"
                                           name="email" type="text" size="14"
                                           alt="PHONE" onChange={this.handleInputChange} required/>
                                </div>
                                <button type="submit" className="btn yelp-btn" name="Submit"><i className="fa fa-yelp"></i>Connect To Yelp</button>
                            </form>


                            <div className="manual"><a href="">I'll fill out the info manually.</a></div>
                        </div>
                    </div>
                </div>
            </div>
        );


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
                    {modal}
                    <h1 className="display1">Business Information</h1>
                    {this.state.newTruck !== {} && this.state.newTruck !== undefined &&
                    <div>












                    </div>}
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
