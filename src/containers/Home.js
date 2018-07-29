import React from 'react';
import '../../node_modules/bootstrap/js/dist/dropdown.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../styles/home.css';
import '../styles/test.css';
import logo from '../resources/background/logo.jpg'
import user from '../resources/icons/user.png'

import MapContainer from './MapContainer';

export default class Home
    extends React.Component {

    render() {
        return (
            <div>
                <div className="background home"></div>
                <nav className="navbar navbar-light sticky-top">
                    <a className="navbar-brand mt-2" href="/home">
                        <img src={logo} width="47" height="35"
                             className="mr-3 d-inline-block align-top" alt=""/>
                        FOOD TRUCK MAPPER
                    </a>
                    <a className="nav-item" id="nav-item-1">Find Trucks</a>
                    <a className="nav-item" id="nav-item-2">Trending</a>
                    <span className="nav-item dropdown" id="user-icon">
                        <a className="nav-item dropdown dropdown-toggle" id="navbarDropdownMenuLink" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={user} width="14" height="14" className="d-inline-block" alt=""/>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item">Log In</a>
                            <a className="dropdown-item">Register</a>
                        </div>
                    </span>
                </nav>
                <MapContainer/>
                <nav className="navbar navbar-light sticky-bottom">
                    <a className="navbar-brand">
                        ©2018 All Rights Reserved.
                    </a>
                    <a className="nav-item" id="nav-item-2">Contact Us</a>
                    <a className="nav-item" id="nav-item-3">Vendor?</a>
                </nav>



            </div>
        );
    }
}
