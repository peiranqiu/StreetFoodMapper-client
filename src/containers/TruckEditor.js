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
import TruckServiceClient from "../services/TruckServiceClient";
import HolidayServiceClient from "../services/HolidayServiceClient";
import DatePicker from 'react-date-picker'
import {Tabs, TabList, Tab, PanelList, Panel, ExtraButton} from 'react-tabtab';
import * as constants from "../constants/constant";
import {geocodeByAddress, geocodeByPlaceId, getLatLng,} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
import loader from "../resources/background/loader.gif"
import OpenTimeServiceClient from "../services/OpenTimeServiceClient";
import ScheduleServiceClient from "../services/ScheduleServiceClient";
import PhotoServiceClient from "../services/PhotoServiceClient";
import UserServiceClient from "../services/UserServiceClient";

export default class TruckEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
            activeIndex: 0,
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false, // Indicates in progress state of login form
            owner: {},
            newTruck: {},
            newHolidays: [],
            newSchedules: [],
            admin: null
        }
        this.ownerService = OwnerServiceClient.instance();
        this.userService = UserServiceClient.instance();
        this.truckService = TruckServiceClient.instance();
        this.scheduleService = ScheduleServiceClient.instance();
        this.photoService = PhotoServiceClient.instance();
        this.openTimeService = OpenTimeServiceClient.instance();
        this.holidayService = HolidayServiceClient.instance();

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleExtraButton = this.handleExtraButton.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.initTab = this.initTab.bind(this);
    }

    componentDidMount() {
        this.userService.findCurrentUser()
            .then(user => {
                if (user !== undefined && user !== null && user.email === "admin") {
                    this.setState({admin: true});
                }
                else {
                    this.setState({admin: false});
                }
            });
        this.ownerService.findCurrentOwner()
            .then(owner => {
                this.setState({owner: owner});
            });

        let truckId = this.props.match.params.truckId;
        this.truckService.findTruckById(truckId)
            .then(truck => {
                this.setState({newTruck: truck});
                this.initTab();
            });

        window.myCallbackFunc = function () {
            window.initOne && window.initOne();
        }

        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=" + constants.GOOGLE_MAP_KEY + "&libraries=places&callback=myCallbackFunc";
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }

    renderCategories() {
        return (
            constants.CATEGORIES.map((category, i) => (
                <option value={category} key={i}>{category}</option>
            )));
    }

    renderContent(i) {
        if (this.state.newTruck.schedules[i] !== undefined && this.state.newTruck.schedules[i].openTimes.length === 7) {
            this.state.newTruck.schedules[i].openTimes.sort((a, b) => a.day - b.day);
            return (
                <div>
                    <div className="schedule-content">
                        {this.state.newTruck.schedules[i].openTimes.map((openTime, j) => {
                            var id1 = "open-" + i + "-" + j;
                            var id2 = "close-" + i + "-" + j;
                            return (
                                <div className="schedule-day ml-3 mt-4" key={j}>
                                    <div className="form-check">
                                        <input className="form-check-input" id={j} type="checkbox" value=""
                                               defaultChecked={this.state.newTruck.schedules[i].openTimes[j].startTime !== 0}
                                               onChange={(e) => {
                                                   var newTruck = this.state.newTruck;
                                                   if (e.target.checked === false) {
                                                       newTruck.schedules[i].openTimes[j].startTime = 0;
                                                       newTruck.schedules[i].openTimes[j].endTime = 0;
                                                       document.getElementById(id1).value = 0;
                                                       document.getElementById(id2).value = 0;
                                                       this.openTimeService.updateOpenTime(newTruck.id, newTruck.schedules[i].id,
                                                           newTruck.schedules[i].openTimes[j].id, newTruck.schedules[i].openTimes[j]);
                                                   }
                                                   newTruck.schedules[i].openTimes[j].checked = e.target.checked;
                                                   this.setState({newTruck: newTruck});
                                               }}/>
                                    </div>
                                    {j === 0 && <span>MON</span>}
                                    {j === 1 && <span>TUE</span>}
                                    {j === 2 && <span>WED</span>}
                                    {j === 3 && <span>THU</span>}
                                    {j === 4 && <span>FRI</span>}
                                    {j === 5 && <span>SAT</span>}
                                    {j === 6 && <span>SUN</span>}

                                    <select className="form-control opentime mx-3" id={id1}
                                            defaultValue={openTime.startTime}
                                            onChange={(e) => {
                                                var newTruck = this.state.newTruck;
                                                newTruck.schedules[i].openTimes[j].startTime = e.target.value;
                                                this.openTimeService.updateOpenTime(newTruck.id, newTruck.schedules[i].id,
                                                    newTruck.schedules[i].openTimes[j].id, newTruck.schedules[i].openTimes[j]);
                                                this.setState({newTruck: newTruck});
                                            }}>
                                        <option value="0">0:00</option>
                                        <option value="600">6:00</option>
                                        <option value="630">6:30</option>
                                        <option value="700">7:00</option>
                                        <option value="730">7:30</option>
                                        <option value="800">8:00</option>
                                        <option value="830">8:30</option>
                                        <option value="900">9:00</option>
                                        <option value="930">9:30</option>
                                        <option value="1000">10:00</option>
                                        <option value="1030">10:30</option>
                                        <option value="1100">11:00</option>
                                        <option value="1130">11:30</option>
                                        <option value="1200">12:00</option>
                                        <option value="1230">12:30</option>
                                        <option value="1300">13:00</option>
                                        <option value="1330">13:30</option>
                                        <option value="1400">14:00</option>
                                        <option value="1430">14:30</option>
                                        <option value="1500">15:00</option>
                                        <option value="1530">15:30</option>
                                        <option value="1600">16:00</option>
                                        <option value="1630">16:30</option>
                                        <option value="1700">17:00</option>
                                        <option value="1730">17:30</option>
                                        <option value="1800">18:00</option>
                                    </select>
                                    <span className="to">TO</span>
                                    <select className="form-control closetime ml-3" id={id2}
                                            defaultValue={openTime.endTime}
                                            onChange={(e) => {
                                                var newTruck = this.state.newTruck;
                                                newTruck.schedules[i].openTimes[j].endTime = e.target.value;
                                                this.openTimeService.updateOpenTime(newTruck.id, newTruck.schedules[i].id,
                                                    newTruck.schedules[i].openTimes[j].id, newTruck.schedules[i].openTimes[j]);
                                                this.setState({newTruck: newTruck});
                                            }}>
                                        <option value="0">0:00</option>
                                        <option value="1000">10:00</option>
                                        <option value="1030">10:30</option>
                                        <option value="1100">11:00</option>
                                        <option value="1130">11:30</option>
                                        <option value="1200">12:00</option>
                                        <option value="1230">12:30</option>
                                        <option value="1300">13:00</option>
                                        <option value="1330">13:30</option>
                                        <option value="1400">14:00</option>
                                        <option value="1430">14:30</option>
                                        <option value="1500">15:00</option>
                                        <option value="1530">15:30</option>
                                        <option value="1600">16:00</option>
                                        <option value="1630">16:30</option>
                                        <option value="1700">17:00</option>
                                        <option value="1730">17:30</option>
                                        <option value="1800">18:00</option>
                                        <option value="1830">18:30</option>
                                        <option value="1900">19:00</option>
                                        <option value="1930">19:30</option>
                                        <option value="2000">20:00</option>
                                        <option value="2030">20:30</option>
                                        <option value="2100">21:00</option>
                                        <option value="2130">21:30</option>
                                        <option value="2200">22:00</option>
                                        <option value="2230">22:30</option>
                                        <option value="2300">23:00</option>
                                        <option value="2330">23:30</option>
                                    </select>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )
        }
        return (<div className="schedule-content container" id="empty-content"></div>);
    }


    initTab() {
        const {tabs} = this.state;
        var len = this.state.newTruck.schedules.length;
        var newTabs = [...tabs];
        for (var i = 0; i < len; i++) {
            newTabs.push({title: 'Location ' + (i + 1), content: this.renderContent(i)});
        }
        this.setState({tabs: newTabs});
    }

    handleExtraButton() {
        const {tabs} = this.state;
        this.createSchedule();
        var i = this.state.newTruck.schedules.length - 1;
        const newTabs = [...tabs, {title: 'Location ' + (tabs.length + 1), content: this.renderContent(i)}];
        this.setState({tabs: newTabs, activeIndex: newTabs.length - 1});
        this.render();
    }

    handleTabChange(index) {
        this.setState({activeIndex: index});
        this.render();
    }

    handleEdit({type, index}) {
        let {tabs, activeIndex} = this.state;
        if (type === 'delete') {
            tabs.splice(index, 1);
            var newTruck = this.state.newTruck;
            this.scheduleService.deleteSchedule(newTruck.schedules[index].id);
            newTruck.schedules.splice(index, 1);
            this.setState({newTruck: newTruck});
        }
        if (index - 1 >= 0) {
            activeIndex = index - 1;
        } else {
            activeIndex = 0;
        }
        this.setState({tabs, activeIndex});
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

    logout = (e) => {
        if (window.confirm('Are you sure you want to log out?')) {
            this.ownerService.logout();
            window.location.href = "/home";
        }
    }

    dateToNumber(date) {
        return Number(date.toISOString().substring(5, 7) + date.toISOString().substring(8, 10));
    }

    numberToDate(number) {
        var date = new Date();
        date.setMonth(Math.floor(number / 100) - 1, number % 100);
        return date;
    }

    createHoliday = (e) => {
        var newTruck = this.state.newTruck;
        this.holidayService.createHoliday(newTruck.id, {date: this.dateToNumber(new Date())})
            .then((holiday) => {
                newTruck.holidays.push(holiday);
                this.setState({newTruck: newTruck});
            });
    }

    createSchedule = (e) => {
        var newTruck = this.state.newTruck;
        var schedule = {
            address: '',
            latitude: '',
            longitude: '',
            openTimes: []
        };
        var openTimes = [
            {day: 1, startTime: 0, endTime: 0, checked: true},
            {day: 2, startTime: 0, endTime: 0, checked: true},
            {day: 3, startTime: 0, endTime: 0, checked: true},
            {day: 4, startTime: 0, endTime: 0, checked: true},
            {day: 5, startTime: 0, endTime: 0, checked: true},
            {day: 6, startTime: 0, endTime: 0, checked: true},
            {day: 7, startTime: 0, endTime: 0, checked: true}
        ];

        this.scheduleService.createSchedule(newTruck.id, schedule)
            .then((newSchedule) => {
                openTimes.map((openTime) => {
                    this.openTimeService.createOpenTime(newTruck.id, newSchedule.id, openTime)
                        .then((newOpenTime) => {
                            newSchedule.openTimes.push(newOpenTime);
                            newTruck.schedules.push(newSchedule);
                            this.setState({newTruck: newTruck});
                        })
                })
            });


    }

    updateTruck = (e) => {
        e.preventDefault();
        let validate = false;
        this.state.newTruck.photos.map((photo) => {
            if (photo.href === "" || photo.href === undefined) {
                validate = true;
            }
        });
        this.state.newTruck.schedules.map((schedule) => {
            if (schedule.address === "" || schedule.address === undefined) {
                validate = true;
            }
        });
        if (this.state.newTruck.name === undefined || validate) {
            alert("Please fill out the form correctly.");
        }
        else {
            this.truckService.updateTruck(this.state.newTruck.id, this.state.newTruck)
                .then(() => {
                    alert("Truck Updated");
                    window.location.href = "/truck/" + this.state.newTruck.id + "/preview";
                });
        }
    }

    render() {
        if ((this.state.owner === undefined || this.state.owner === {}) && this.state.admin === false) {
            alert("Plase Log In");
            window.location.href = "/login/owner";
        }
        const {tabs, activeIndex} = this.state;
        const tabTemplate = [];
        const panelTemplate = [];
        tabs.forEach((tab, i) => {
            console.log(this.state.newTruck.schedules);
            const closable = tabs.length > 1;
            tabTemplate.push(<Tab key={i} closable={closable}>Location {i + 1}</Tab>);
            var address = '';
            if (this.state.newTruck.schedules[i] !== undefined) {
                address = this.state.newTruck.schedules[i].address;
            }
            panelTemplate.push(<Panel key={i}>
                <PlacesAutocomplete
                    value={address}
                    onChange={(change) => {
                        var newTruck = this.state.newTruck;
                        newTruck.schedules[i].address = change;
                        this.scheduleService.updateSchedule(newTruck.id, newTruck.schedules[i].id, newTruck.schedules[i]);
                        this.setState({newTruck: newTruck});
                    }}
                    onSelect={(address) => {
                        geocodeByAddress(address)
                            .then(results => getLatLng(results[0]))
                            .then(latLng => {
                                var newTruck = this.state.newTruck;
                                newTruck.schedules[i].address = address;
                                newTruck.schedules[i].latitude = latLng.lat;
                                newTruck.schedules[i].longitude = latLng.lng;
                                this.scheduleService.updateSchedule(newTruck.id, newTruck.schedules[i].id, newTruck.schedules[i]);
                                this.setState({newTruck: newTruck});
                            })
                            .catch(error => console.error('Error', error));
                    }}
                    googleCallbackName="initOne"
                >
                    {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: 'Enter Location',
                                    className: 'location-search-input',
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                                        : {backgroundColor: '#ffffff', cursor: 'pointer'};
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                {this.renderContent(i)}
            </Panel>);
        });
        var href = "/truck/" + this.state.newTruck.id + "/preview"
        var homeHref = "/dashboard";
        if (this.state.admin) {
            homeHref = "/home";
        }

        return (

            <div id="profile-page" className="user-page vendor-page">
                <nav className="navbar navbar-light sticky-top">
                    <a className="navbar-brand mt-2" href={href}>
                        <img src={logo} width="100" height="38"
                             className="mr-3 d-inline-block align-top" alt=""/>
                    </a>
                    <span className="nav-item dropdown" id="user-icon">
                        <a className="nav-item dropdown dropdown-toggle" id="navbarDropdownMenuLink" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={user} width="14" height="14" className="d-inline-block" alt=""/>
                        </a>
                        {this.state.owner !== undefined && !this.state.admin
                        && <a className="nav-item current-user">{this.state.owner.email}</a>}
                        {this.state.admin
                        && <a className="nav-item current-user">admin</a>}
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {this.state.owner !== undefined && !this.state.admin
                            && <a className="dropdown-item" href="/profile/owner">Profile</a>}
                            {this.state.owner !== undefined && !this.state.admin
                            && <a className="dropdown-item" onClick={this.logout}>Log Out</a>}
                        </div>
                    </span>
                </nav>
                {(this.state.newTruck === {})
                &&
                <div className="container" id="create-container">
                    <div className="truck-loader"><img alt="" src={loader}/></div>
                </div>
                }
                {this.state.newTruck !== {} && this.state.newTruck.photos !== undefined && this.state.newTruck.reviews !== undefined
                && this.state.newTruck.schedules !== undefined && this.state.newTruck.holidays !== undefined &&
                <div className="container" id="create-container">
                    <h1 className="display1">Business Information</h1>
                    <div className="yelp-preview">
                    </div>
                    <form action="" method="" className="create-form" role="form">
                        <div className="row">
                            <div className="col col-2"></div>
                            <div className="col col-4 py-3 mr-3" id="form-info-container">
                                <h5 className="text-center mb-5 ">Basic Information</h5>

                                <div id="form-business-name" className="form-group">
                                    <div className="form-label">Business Name</div>
                                    <input id="business-name" className="form-control" name="name" type="text" size="14"
                                           alt="NAME" defaultValue={this.state.newTruck.name}
                                           onChange={(e) => {
                                               var truck = this.state.newTruck;
                                               truck.name = e.target.value;
                                               this.setState({newTruck: truck});
                                               this.handleInputChange(e);
                                           }} required/>
                                </div>

                                <div id="form-business-phone" className="form-group">
                                    <div className="form-label">Phone Number</div>
                                    <input id="business-phone" className="form-control" name="phone" type="text"
                                           size="14"
                                           alt="PHONE" defaultValue={this.state.newTruck.phone} placeholder="+1"
                                           onChange={(e) => {
                                               var truck = this.state.newTruck;
                                               truck.phone = e.target.value;
                                               this.setState({newTruck: truck});
                                               this.handleInputChange(e);
                                           }} required/>
                                </div>
                                <div id="form-business-category" className="form-group">
                                    <div className="form-label mb-3">Categories</div>
                                    <div className="row mx-1">
                                        <select className="col form-control category mr-2" id="category1"
                                                name="category1"
                                                defaultValue={this.state.newTruck.category1}
                                                onChange={(e) => {
                                                    var truck = this.state.newTruck;
                                                    truck.category1 = e.target.value;
                                                    this.setState({newTruck: truck});
                                                    this.handleInputChange(e);
                                                }} required>
                                            {this.renderCategories()}
                                        </select>
                                        <select className="col form-control category mx-2" id="category2"
                                                name="category2"
                                                defaultValue={this.state.newTruck.category2}
                                                onChange={(e) => {
                                                    var truck = this.state.newTruck;
                                                    truck.category2 = e.target.value;
                                                    this.setState({newTruck: truck});
                                                    this.handleInputChange(e);
                                                }} required>
                                            {this.renderCategories()}
                                        </select>
                                        <select className="col form-control category ml-2" id="category3"
                                                name="category3"
                                                defaultValue={this.state.newTruck.category3}
                                                onChange={(e) => {
                                                    var truck = this.state.newTruck;
                                                    truck.category3 = e.target.value;
                                                    this.setState({newTruck: truck});
                                                    this.handleInputChange(e);
                                                }} required>
                                            {this.renderCategories()}
                                        </select>
                                    </div>

                                </div>
                                <div id="form-business-website" className="form-group">
                                    <div className="form-label">Website</div>
                                    <input id="business-website" className="form-control" name="website" type="text"
                                           size="14" alt="WEBSITE" defaultValue={this.state.newTruck.website}
                                           onChange={(e) => {
                                               var truck = this.state.newTruck;
                                               truck.website = e.target.value;
                                               this.setState({newTruck: truck});
                                               this.handleInputChange(e);
                                           }} required/>
                                </div>
                                <div id="form-business-menu" className="form-group">
                                    <div className="form-label">Menu URL</div>
                                    <input id="business-menu" className="form-control" name="menu" type="text"
                                           size="14"
                                           alt="MENU" defaultValue={this.state.newTruck.menu}
                                           onChange={(e) => {
                                               var truck = this.state.newTruck;
                                               truck.menu = e.target.value;
                                               this.setState({newTruck: truck});
                                               this.handleInputChange(e);
                                           }} required/>
                                </div>
                                <div id="form-business-twitter" className="form-group">
                                    <div className="form-label">Twitter URL</div>
                                    <input id="business-twitter" className="form-control" name="twitter" type="text"
                                           size="14"
                                           alt="TWITTER" defaultValue={this.state.newTruck.twitter}
                                           onChange={(e) => {
                                               var truck = this.state.newTruck;
                                               truck.twitter = e.target.value;
                                               this.setState({newTruck: truck});
                                               this.handleInputChange(e);
                                           }} required/>
                                </div>
                            </div>
                            <div className="col col-4 ml-3 py-3" id="form-schedule-container">
                                <h5 className="text-center mb-5">Regular Schedule</h5>
                                <Tabs onTabEdit={this.handleEdit}
                                      onTabChange={this.handleTabChange}
                                      activeIndex={activeIndex}
                                      customStyle={this.props.customStyle}
                                      ExtraButton={
                                          <ExtraButton type="button"
                                                       onClick={this.handleExtraButton}>
                                              <i className="fa fa-plus"></i>
                                          </ExtraButton>
                                      }>
                                    <TabList>
                                        {tabTemplate}
                                    </TabList>
                                    <PanelList>
                                        {panelTemplate}
                                    </PanelList>
                                </Tabs>
                            </div>
                            <div className="col col-2"></div>
                        </div>

                        <div className="row">
                            <div className="col col-2"></div>
                            <div className="col col-4 mr-3 py-3" id="form-photo-container">
                                <h5 className="text-center mb-5 ">Photos</h5>

                                <div id="form-business-photo1" className="form-group">
                                    <div className="form-label">Photo 1 URL (Cover Photo)</div>
                                    <input id="business-photo1" className="form-control" name="photo1" type="text"
                                           size="14"
                                           alt="PHOTO1"
                                           defaultValue={this.state.newTruck.photos[0].href} placeholder="http://"
                                           onChange={(e) => {
                                               var truck = this.state.newTruck;
                                               truck.photos[0].href = e.target.value;
                                               this.photoService.updatePhoto(truck.id, truck.photos[0].id, truck.photos[0]);
                                               this.setState({newTruck: truck});
                                               this.handleInputChange(e);
                                           }} required/>
                                </div>
                                <div id="form-business-photo2" className="form-group">
                                    <div className="form-label">Photo 2 URL</div>
                                    <input id="business-photo2" className="form-control" name="photo2" type="text"
                                           size="14"
                                           alt="PHOTO2"
                                           defaultValue={this.state.newTruck.photos[1].href} placeholder="http://"
                                           onChange={(e) => {
                                               var truck = this.state.newTruck;
                                               truck.photos[1].href = e.target.value;
                                               this.photoService.updatePhoto(truck.id, truck.photos[1].id, truck.photos[1]);
                                               this.setState({newTruck: truck});
                                               this.handleInputChange(e);
                                           }} required/>
                                </div>
                                <div id="form-business-photo3" className="form-group">
                                    <div className="form-label">Photo 3 URL</div>
                                    <input id="business-photo3" className="form-control" name="photo3" type="text"
                                           size="14"
                                           alt="PHOTO3"
                                           defaultValue={this.state.newTruck.photos[2].href} placeholder="http://"
                                           onChange={(e) => {
                                               var truck = this.state.newTruck;
                                               truck.photos[2].href = e.target.value;
                                               this.photoService.updatePhoto(truck.id, truck.photos[2].id, truck.photos[2]);
                                               this.setState({newTruck: truck});
                                               this.handleInputChange(e);
                                           }} required/>
                                </div>
                            </div>
                            <div className="col col-4 py-3 ml-3" id="form-holiday-container">
                                <h5 className="text-center mb-5">Holiday List</h5>
                                <div className="add-holiday text-right" onClick={this.createHoliday}>Add Holiday</div>
                                <div className="holiday-list">
                                    {this.state.newTruck.holidays.map((holiday, i) => {
                                        return (
                                            <div className="holiday-item" key={i}>
                                                <DatePicker onChange={(pick) => {
                                                    var newTruck = this.state.newTruck;
                                                    newTruck.holidays[i].date = this.dateToNumber(pick);
                                                    this.holidayService.updateHoliday(newTruck.id, newTruck.holidays[i].id, newTruck.holidays[i]);
                                                    this.setState({newTruck: newTruck});
                                                }} value={this.numberToDate(this.state.newTruck.holidays[i].date)}/>
                                                <a onClick={() => {
                                                    var newTruck = this.state.newTruck;
                                                    this.holidayService.deleteHoliday(newTruck.holidays[i].id);
                                                    newTruck.holidays.splice(i, 1);
                                                    this.setState({newTruck: newTruck});
                                                }}>
                                                    <i className="fa fa-times"></i></a></div>)
                                    })}
                                </div>
                            </div>
                            <div className="col col-2"></div>
                        </div>
                        <div className="row mb-1">
                            <button className="btn btn-block ripple-effect create-button" type="submit" name="Submit"
                                    alt="sign in" onClick={this.updateTruck}>Save and Preview
                            </button>
                        </div>
                    </form>
                </div>}

                <nav className="navbar navbar-light sticky-bottom">
                    <a className="navbar-brand">
                        ©2018 All Rights Reserved.
                    </a>
                    {!this.state.admin &&
                    <a className="nav-item" id="nav-item-2" href="mailto:streetfoodmapper@gmail.com?Subject=Hello">Contact
                        Us</a>}
                    {!this.state.admin && <a className="nav-item" id="nav-item-3" href="/register/user">Foodie?</a>}
                </nav>
            </div>
        );
    }
}
