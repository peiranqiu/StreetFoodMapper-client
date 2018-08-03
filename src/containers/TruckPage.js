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

import TruckMap from './TruckMap'
import {
    TwitterTimelineEmbed,
    TwitterShareButton,
    TwitterFollowButton,
    TwitterHashtagButton,
    TwitterMentionButton,
    TwitterTweetEmbed,
    TwitterMomentShare,
    TwitterDMButton,
    TwitterVideoEmbed,
    TwitterOnAirButton
} from 'react-twitter-embed';

export default class Home
    extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
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
    }

    componentWillReceiveProps(newProps) {
        this.userService.findCurrentUser()
            .then(user => {
                this.setState({user: user});
            });
    }

    logout = (e) => {

        this.userService.logout();
    }

    format(time) {
        if(time.startTime === 0) {
            return("Closed");
        }

        return (parseInt(time.startTime/100) + ":"
            + (time.startTime%100<10? "0"+time.startTime%100 : time.startTime%100) + " - "
            + parseInt(time.endTime/100) + ":"
            + (time.endTime%100<10? "0"+time.endTime%100 : time.endTime%100));
    }
    convert(date) {
        var result = "January";
        switch (parseInt(date/100)) {
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
        return (result + date%100);
    }

    render() {
        var rating = null;
        if (this.state.truck !== {}) {
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
                    <a className="nav-item" id="nav-item-0" href="#">About</a>
                    <a className="nav-item" id="nav-item-1" href="#schedule-anchor">Schedules</a>
                    <a className="nav-item" id="nav-item-2" href="#truck-feed-container">Reviews</a>
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
                            && <a className="dropdown-item" href="/register/user">Register</a>}
                            {this.state.user !== undefined
                            && <a className="dropdown-item" href="/profile/user">Profile</a>}
                            {this.state.user !== undefined
                            && <a className="dropdown-item" href="/home" onClick={this.logout}>Log Out</a>}
                        </div>
                    </span>
                </nav>


                {this.state.truck === {}
                && <div className="container-fluid truck-info-container">
                    <div className="truck-loader"><img alt="" src={loader}/></div>
                </div>}
                {this.state.truck !== {} && this.state.truck.photos !== undefined
                && this.state.truck.schedules !== undefined && this.state.truck.holidays !== undefined &&
                <div>
                    <div className="container truck-info-container">
                        <div className="row">
                            <div className="col col-1"></div>
                            <div className="col">
                                <h1 className="truck-page-title">{this.state.truck.name}</h1></div>
                            <div className="col col-1"></div>
                        </div>
                        <div className="row">
                            <div className="col col-1"></div>
                            <div className="col col-4">
                                <img className="truck-rating" src={rating} alt=""/>
                                <a className="onYelp">(On Yelp)</a>
                                <div className="truck-page-category">
                                    {this.state.truck.category1}, {this.state.truck.category2}, {this.state.truck.category3}</div>
                                <div className="truck-page-open">Open Now At</div>
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
                                <button type="button" className="btn shadow" id="btn-open">Open Now</button>
                                <button type="button" className="btn shadow" id="btn-later">Open Later</button>
                                <TruckMap schedules={this.state.truck.schedules}/>
                            </div>
                            <div className="col col-4 right-info">
                                <div className="truck-website mb-1">
                                    <img className="truck-website-icon" width='16px' src={website} alt=""/>
                                    <a href={this.state.truck.website}>{this.state.truck.website}</a>
                                </div>
                                <div className="truck-menu mb-1">
                                    <img className="truck-menu-icon" width='16px' src={menu} alt=""/>
                                    <a href={this.state.truck.menu}>{this.state.truck.menu}</a>
                                </div>
                                <div className="truck-yelp mb-1">
                                    <i className="fa fa-yelp"></i>
                                    <a href={this.state.truck.url}>{this.state.truck.url.split('?', 1)}</a>
                                </div>
                                <div className="truck-phone mb-1">
                                    <img className="truck-phone-icon" width='16px' src={phone} alt=""/>
                                    <a>{this.state.truck.phone}</a>
                                </div>

                                {this.state.truck.twitter !== undefined && this.state.truck.twitter.length > 0 &&
                                <TwitterTimelineEmbed
                                    sourceType="profile"
                                    screenName={this.state.truck.twitter.split('com/').pop()}
                                    options={{height: 240}}
                                />}
                                {(this.state.truck.twitter === null || this.state.truck.twitter.length === 0) &&
                                <img className="emptyTwitter" src={emptyTwitter} height='240px' alt=''/>
                                }
                            </div>
                            <div className="col col-1"></div>
                        </div>
                    </div>
                    <a className="anchor" id="schedule-anchor"></a>
                    <div className="container-fluid schedule-container">
                        <h1>Regular Schedule</h1>
                        <div className="row">
                            <div className="col col-1"></div>
                            <div className="col col">
                                <div className="row justify-content-center">
                                    {this.state.truck.schedules.map((schedule) => {
                                        return (
                                            <div className="col-4 justify-content-center" key={schedule.id}>
                                                <div className="schedule-card row justify-content-center">
                                                    <h4>{schedule.address.substring( 0, schedule.address.indexOf(","))}</h4>
                                                    <div className="schedule-date">Mon
                                                        <a className="schedule-time">
                                                            {this.format(schedule.openTimes[0])}
                                                            </a></div>
                                                    <div className="schedule-date">Tue
                                                        <a className="schedule-time">
                                                            {this.format(schedule.openTimes[1])}
                                                        </a></div>
                                                    <div className="schedule-date">Wed
                                                    <a className="schedule-time">
                                                        {this.format(schedule.openTimes[2])}
                                                    </a></div>
                                                    <div className="schedule-date">Thu
                                                    <a className="schedule-time">
                                                        {this.format(schedule.openTimes[3])}
                                                    </a></div>
                                                    <div className="schedule-date">Fri
                                                    <a className="schedule-time">
                                                        {this.format(schedule.openTimes[4])}
                                                    </a></div>
                                                    <div className="schedule-date">Sat
                                                    <a className="schedule-time">
                                                        {this.format(schedule.openTimes[5])}
                                                    </a></div>
                                                    <div className="schedule-date">Sun
                                                        <a className="schedule-time">
                                                            {this.format(schedule.openTimes[6])}
                                                        </a></div>
                                                </div>
                                            </div>

                                        );
                                    })}
                                </div>
                                <div className="card mt-4 mb-4 holiday-card justify-content-center">
                                    <h4 className="card-title mb-4">Closed Days(2018)</h4>
                                    {this.state.truck.holidays.map((holiday) => {
                                        return (
                                            <div className="holiday">{this.convert(holiday.date)}</div>
                                        )})}
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
                    <a className="nav-item" id="nav-item-2" href="mailto:streetfoodmapper@gmail.com?Subject=Hello">Contact
                        Us</a>
                    <a className="nav-item" id="nav-item-3" href="/register/owner">Vendor?</a>
                </nav>


            </div>
        );
    }
}
