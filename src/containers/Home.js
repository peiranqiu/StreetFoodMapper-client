import React from 'react';
import '../../node_modules/bootstrap/js/dist/dropdown.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../styles/home.css';
import '../styles/test.css';
import $ from 'jquery'
import logo from '../resources/background/logo.png'
import user from '../resources/icons/user.png'
import arrow from '../resources/icons/arrow-up.png'
import MapContainer from './MapContainer';
import TrendingContainer from './TrendingContainer';
import UserServiceClient from "../services/UserServiceClient";


export default class Home
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

        $(document).ready(function () {
            // Add smooth scrolling to all links
            $("a").on('click', function (event) {
                // Make sure this.hash has a value before overriding default behavior
                if (this.hash !== "") {
                    // Prevent default anchor click behavior
                    event.preventDefault();

                    // Store hash
                    var hash = this.hash;

                    if ($(hash).offset() !== undefined) {
                        // Using jQuery's animate() method to add smooth page scroll
                        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
                        $('html, body').animate({
                            scrollTop: $(hash).offset().top
                        }, 500, function () {

                            // Add hash (#) to URL when done scrolling (default click behavior)
                            window.location.hash = hash;
                        });
                    }
                } // End if
            });
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

    logout = (e) => {
        if (window.confirm('Are you sure you want to log out?')) {
            this.userService.logout();
        }
    }

    render() {
        window.addEventListener("scroll", function (event) {
            document.getElementById("nav-item-1").classList.remove("active");
            document.getElementById("nav-item-2").classList.remove("active");
            if (document.getElementById("trending-container") !== null && document.getElementById("trending-container").getBoundingClientRect().top <= 0) {
                document.getElementById("nav-item-2").classList.add("active");
            }
            else if (document.getElementById("map-anchor") !== null && document.getElementById("map-anchor").getBoundingClientRect().top <= 0) {
                document.getElementById("nav-item-1").classList.add("active");
            }
        }, false);
        return (
            <div>

                <div id="homepage-mobile" className="p-4">Mobile Version is Currently Unavailable</div>
                <div id="homepage">
                    <div className="background home"></div>
                    <div id="arrow-text">What Are You Hungry For?</div>
                    <a href="#map-anchor"><img id="arrow-up" src={arrow} alt=""/></a>
                    <nav className="navbar navbar-light sticky-top">
                        <a className="navbar-brand mt-2" href="#homepage">
                            <img src={logo} width="106.4" height="38"
                                 className="mr-3 d-inline-block align-top" alt=""/>
                        </a>
                        <a className="nav-item" id="nav-item-1" href="#map-anchor">Find Trucks</a>
                        <a className="nav-item" id="nav-item-2" href="#trending-container">Trending</a>
                        <span className="nav-item dropdown" id="user-icon">
                        <a className="nav-item dropdown dropdown-toggle" id="navbarDropdownMenuLink" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={user} width="14" height="14" className="d-inline-block" alt=""/>
                        </a>
                            {this.state.user !== undefined
                            && <a className="nav-item current-user">{this.state.user.email}</a>}
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {this.state.user === undefined
                            && <a className="dropdown-item" href="/login/user">Log In</a>}
                                {this.state.user === undefined
                                && <a className="dropdown-item" href="/register/user">Sign Up</a>}
                                {this.state.user !== undefined && this.state.user.email !== "admin"
                                && <a className="dropdown-item" href="/profile/user">Profile</a>}
                                {this.state.user !== undefined && this.state.user.email === "admin"
                                && <a className="dropdown-item" href="/admin">Dashboard</a>}
                                {this.state.user !== undefined
                                && <a className="dropdown-item" href="/home" onClick={this.logout}>Log Out</a>}


                        </div>
                    </span>
                    </nav>
                    <a className="anchor" id="map-anchor"></a>
                    <MapContainer/>
                    <TrendingContainer/>
                    <nav className="navbar navbar-light sticky-bottom">
                        <a className="navbar-brand">
                            ©2018 All Rights Reserved.
                        </a>
                        <a className="nav-item" id="nav-item-2" href="mailto:streetfoodmapper@gmail.com?Subject=Hello">Contact
                            Us</a>
                        <a className="nav-item" id="nav-item-3" href="/register/owner">Vendor?</a>
                    </nav>

                </div>
            </div>
        );
    }
}
