import React from 'react';
import '../../node_modules/bootstrap/js/dist/dropdown.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../styles/home.css';
import '../styles/test.css';
import '../styles/truck.css';
import logo from '../resources/background/logo.png'
import user from '../resources/icons/user.png'
import TruckServiceClient from '../services/TruckServiceClient'
import UserServiceClient from "../services/UserServiceClient";
import loader from "../resources/background/loader.gif"
import rating1 from '../resources/icons/rating1.png'
import rating2 from '../resources/icons/rating2.png'
import rating3 from '../resources/icons/rating3.png'
import rating4 from '../resources/icons/rating4.png'
import rating5 from '../resources/icons/rating5.png'
import website from '../resources/icons/website.png'
import menu from '../resources/icons/menu.png'
import phone from '../resources/icons/phone.png'
import emptyTwitter from '../resources/background/twitter-background.jpg'
import FeedItem from '../components/FeedItem'

import TruckMap from './TruckMap'
import {TwitterTimelineEmbed} from 'react-twitter-embed';
import $ from "jquery";

export default class TruckPage
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            refresh: false,
            truck: {}
        };
        this.truckService = TruckServiceClient.instance();
        this.userService = UserServiceClient.instance();
    }

    componentDidMount() {
        let truckId = this.props.match.params.truckId;
        this.truckService.findTruckById(truckId)
            .then(truck => {
                this.setState({truck: truck});
            });
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

    logout = (e) => {
        if (window.confirm('Are you sure you want to log out?')) {
            this.userService.logout();
            window.location.href = "/home";
        }
    }

    format(time) {
        if (time.startTime === 0) {
            return ("");
        }
        return (parseInt(time.startTime / 100) + ":"
            + (time.startTime % 100 < 10 ? "0" + time.startTime % 100 : time.startTime % 100) + " - "
            + parseInt(time.endTime / 100) + ":"
            + (time.endTime % 100 < 10 ? "0" + time.endTime % 100 : time.endTime % 100));
    }

    convert(date) {
        var result = "January";
        switch (parseInt(date / 100)) {
            case 2:
                result = "February";
                break;
            case 3:
                result = "March";
                break;
            case 4:
                result = "April";
                break;
            case 5:
                result = "May";
                break;
            case 6:
                result = "June";
                break;
            case 7:
                result = "July";
                break;
            case 8:
                result = "August";
                break;
            case 9:
                result = "September";
                break;
            case 10:
                result = "October";
                break;
            case 11:
                result = "November";
                break;
            case 12:
                result = "December";
                break;
            default:
                result = "January";
        }
        return (result + date % 100);
    }

    render() {
        window.addEventListener("scroll", function (event) {
            document.getElementById("nav-item-0").classList.remove("active");
            document.getElementById("nav-item-1").classList.remove("active");
            document.getElementById("nav-item-2").classList.remove("active");
            if (document.getElementById("feed-anchor") !== null
                && document.getElementById("feed-anchor").getBoundingClientRect().top <= 0) {
                document.getElementById("nav-item-2").classList.add("active");
            }
            else if (document.getElementById("schedule-anchor") !== null
                && document.getElementById("schedule-anchor").getBoundingClientRect().top <= 0) {
                document.getElementById("nav-item-1").classList.add("active");
            }
            else {
                document.getElementById("nav-item-0").classList.add("active");
            }
        }, false);

        var rating = rating1;
        if (this.state.truck !== {} && this.state.truck.rating !== undefined) {
            switch (this.state.truck.rating) {
                case 2:
                    rating = rating2;
                    break;
                case 3:
                    rating = rating3;
                    break;
                case 4:
                    rating = rating4;
                    break;
                case 5:
                    rating = rating5;
                    break;
                default:
                    rating = rating1;
            }
        }

        return (
            <div id="truck-page">
                <nav className="navbar navbar-light sticky-top">
                    <a className="navbar-brand mt-2" href="/home">
                        <img src={logo} width="106.4" height="38"
                             className="mr-3 d-inline-block align-top" alt=""/>
                    </a>
                    <a className="nav-item" id="nav-item-0" href="#truck-page">About</a>
                    <a className="nav-item" id="nav-item-1" href="#schedule-anchor">Schedules</a>
                    <a className="nav-item" id="nav-item-2" href="#feed-anchor">Feeds</a>
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
                            && <a className="dropdown-item" onClick={this.logout}>Log Out</a>}
                        </div>
                    </span>
                </nav>

                {this.state.truck === {}
                &&
                <div className="container-fluid truck-info-container">
                    <div className="truck-loader"><img alt="" src={loader}/></div>
                </div>
                }

                {this.state.truck !== {} && this.state.truck.photos !== undefined && this.state.truck.reviews !== undefined
                && this.state.truck.schedules !== undefined && this.state.truck.holidays !== undefined &&
                <div>
                    <div className="container-fluid photo-container">
                        <img className="cover-photo" src={this.state.truck.photos[0].href}/>
                    </div>
                    <div className="container truck-info-container">
                        <div className="row">
                            <div className="col col-1"></div>
                            <div className="col">
                                <h2 className="truck-page-title">{this.state.truck.name}</h2>
                                <hr/>
                            </div>
                            <div className="col col-1"></div>
                        </div>
                        <div className="row">
                            <div className="col col-1"></div>
                            <div className="col col-4">
                                <img className="truck-rating" src={rating} alt=""/>
                                <a className="onYelp">(On Yelp)</a>
                                <div className="truck-page-category">
                                    {this.state.truck.category1.charAt(0) + this.state.truck.category1.substring(1).toLowerCase()},
                                    {this.state.truck.category2.charAt(0) + this.state.truck.category2.substring(1).toLowerCase()},
                                    {this.state.truck.category3.charAt(0) + this.state.truck.category3.substring(1).toLowerCase()}
                                </div>
                                <div className="truck-page-open">Open Now At</div>
                                <div className="truck-open-container">
                                    {this.state.truck.schedules.map((schedule) => {
                                        let address = schedule.address.substring(0, schedule.address.indexOf(","));
                                        let href = "https://www.google.com/maps/?q=" + schedule.latitude + "," + schedule.longitude;
                                        var now = new Date();
                                        var day = now.getDay();
                                        if (day === 0) {
                                            day = 7;
                                        }
                                        var until = null;
                                        schedule.openTimes.map((time) => {
                                            if (day === time.day) {
                                                until = parseInt(time.endTime / 100) + ":"
                                                    + (time.endTime % 100 < 10 ? "0" + time.endTime % 100 : time.endTime % 100);
                                                return;
                                            }
                                        })
                                        return (schedule.open &&
                                            <div className="truck-open-address">
                                                <i className="fa fa-map-marker"></i>
                                                <a className="truck-open-content ml-3" target="_blank"
                                                   href={href}>{address}</a>
                                                <i className="fa fa-clock-o mt-1"></i>
                                                <a className="until">until {until}</a>
                                            </div>);
                                    })}
                                </div>
                            </div>
                            <div className="col col-2">
                                <img className="truck-page-img"
                                     src={this.state.truck.photos[0].href}/>
                            </div>
                            <div className="col col-2">
                                <img className="truck-page-img"
                                     src={this.state.truck.photos[1].href}/></div>
                            <div className="col col-2">
                                <img className="truck-page-img"
                                     src={this.state.truck.photos[2].href}/></div>
                            <div className="col col-1"></div>
                        </div>
                        <div className="row map-row">
                            <div className="col col-1"></div>
                            <div className="col col-6">
                                <button type="button" data-toggle="button" className="btn shadow" id="btn-open"
                                        onClick={() => {
                                            if ($('#btn-open').hasClass('active')) {
                                                $('#btn-later').removeClass('active');
                                            }
                                            this.setState({refresh: true});
                                        }}>Open Now
                                </button>
                                <button type="button" data-toggle="button" className="btn shadow" id="btn-later"
                                        onClick={() => {
                                            if ($('#btn-later').hasClass('active')) {
                                                $('#btn-open').removeClass('active');
                                            }
                                            this.setState({refresh: true});
                                        }}>Open Later
                                </button>
                                <TruckMap schedules={this.state.truck.schedules}/>
                            </div>
                            <div className="col col-4 right-info">
                                <div className="truck-website mb-1">
                                    <img className="truck-website-icon" width='16px' src={website} alt=""/>
                                    <a href={this.state.truck.website}>{this.state.truck.website.split('//').pop()}</a>
                                </div>
                                <div className="truck-menu mb-1">
                                    <img className="truck-menu-icon" width='16px' src={menu} alt=""/>
                                    <a href={this.state.truck.menu}>{this.state.truck.menu.split('//').pop()}</a>
                                </div>
                                <div className="truck-yelp mb-1">
                                    <i className="fa fa-yelp"></i>
                                    <a href={this.state.truck.url.length>13 && this.state.truck.url}>
                                        {this.state.truck.url.length === 0 && "not provided"}
                                        {this.state.truck.url.length>0 && this.state.truck.url.split('biz/').pop().split('?', 1)}</a>
                                </div>
                                <div className="truck-phone mb-1">
                                    <img className="truck-phone-icon" width='16px' src={phone} alt=""/>
                                    <a>{this.state.truck.phone}</a>
                                </div>

                                {this.state.truck.twitter !== undefined && this.state.truck.twitter.length > 0 &&
                                <TwitterTimelineEmbed
                                    sourceType="profile"
                                    screenName={this.state.truck.twitter.split('com/').pop()}
                                    options={{height: 260}}
                                />}
                                {(this.state.truck.twitter === undefined || this.state.truck.twitter.length < 20) &&
                                <img className="emptyTwitter" src={emptyTwitter} height='240px' alt=''/>
                                }
                            </div>
                            <div className="col col-1"></div>
                        </div>
                    </div>
                    <a className="anchor" id="schedule-anchor"></a>
                    <div className="container schedule-container">
                        <div className="row">
                            <div className="col col-1"></div>
                            <div className="col">
                                <h1 className="truck-page-title">Regular Schedule</h1>
                                <hr/>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col">MON</th>
                                        <th scope="col">TUE</th>
                                        <th scope="col">WED</th>
                                        <th scope="col">THU</th>
                                        <th scope="col">FRI</th>
                                        <th scope="col">SAT</th>
                                        <th scope="col">SUN</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.truck.schedules.map((schedule) => {
                                        schedule.openTimes.sort((a, b) => a.day - b.day);
                                        return (
                                            <tr key={schedule.id}>
                                                <th scope="row">
                                                    {schedule.address.substring(0, schedule.address.indexOf(","))}
                                                </th>
                                                <td></td>
                                                <td></td>
                                                <td>{this.format(schedule.openTimes[0])}</td>
                                                <td>{this.format(schedule.openTimes[1])}</td>
                                                <td>{this.format(schedule.openTimes[2])}</td>
                                                <td>{this.format(schedule.openTimes[3])}</td>
                                                <td>{this.format(schedule.openTimes[4])}</td>
                                                <td>{this.format(schedule.openTimes[5])}</td>
                                                <td>{this.format(schedule.openTimes[6])}</td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Closed Days</th>
                                        <td></td>
                                        <td></td>
                                        {this.state.truck.holidays.map((holiday) => {
                                            return (
                                                <td key={holiday.id}>{this.convert(holiday.date)}</td>
                                            )
                                        })}
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col col-1"></div>
                        </div>
                    </div>
                    <a className="anchor" id="feed-anchor"></a>
                    <div className="container" id="feed-container">
                        <div className="row">
                            <div className="col col-1"></div>
                            <div className="col">
                                <h1 className="truck-page-title">Recent Feeds<span> (On Yelp)</span></h1>
                                <hr/>
                                <div className="row feed-row">
                                    <div className="col"><FeedItem truck={this.state.truck} index="1"/></div>
                                    <div className="col"><FeedItem truck={this.state.truck} index="2"/></div>
                                    <div className="col"><FeedItem truck={this.state.truck} index="0"/></div>
                                </div>
                            </div>
                            <div className="col col-1"></div>
                        </div>
                    </div>
                </div>
                }
                <nav className="navbar navbar-light sticky-bottom">
                    <a className="navbar-brand">
                        ©2018 All Rights Reserved.
                    </a>
                    <a className="nav-item" id="nav-item-2" href="mailto:streetfoodmapper@gmail.com?Subject=Hello">
                        Contact Us</a>
                    <a className="nav-item" id="nav-item-3" href="/register/owner">Vendor?</a>
                </nav>
            </div>
        );
    }
}
