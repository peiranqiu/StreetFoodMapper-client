import React from 'react'
import '../../node_modules/bootstrap/js/dist/dropdown.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import {Modal, Button} from 'bootstrap'
import $ from 'jquery'
import '../styles/test.css'
import '../styles/user.css'
import '../styles/truck.css'
import '../styles/dashboard.css'
import logo from '../resources/background/logo-red.png'
import user from '../resources/icons/user-white.png'
import OwnerServiceClient from "../services/OwnerServiceClient";
import YelpServiceClient from "../services/YelpServiceClient";
import {isEmpty, isLength, isContainWhiteSpace} from '../constants/validator'
import DatePicker from 'react-date-picker'
import {Tabs, TabList, Tab, PanelList, Panel, ExtraButton} from 'react-tabtab';
import * as constants from "../constants/constant";
import {geocodeByAddress, geocodeByPlaceId, getLatLng,} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';

export default class CreateTruck
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
            holidays: [],
            schedules: []
        }
        this.ownerService = OwnerServiceClient.instance();
        this.yelpService = YelpServiceClient.instance();

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleExtraButton = this.handleExtraButton.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        this.ownerService.findCurrentOwner()
            .then(owner => {
                this.setState({owner: owner});
            });
        // $('.modal').modal('show');


        window.myCallbackFunc = function () {
            window.initOne && window.initOne();
        }

        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=" + constants.GOOGLE_MAP_KEY + "&libraries=places&callback=myCallbackFunc";
        script.async = true;
        ref.parentNode.insertBefore(script, ref);

        this.handleExtraButton();
    }

    renderCategories() {
        return(
        constants.CATEGORIES.map((category, i) => (
            <option value={category} key={i}>{category}</option>
        )));
}

    renderContent(i) {
        return (
            <div>
                <div className="schedule-content">
                    {this.state.schedules[i].openTimes.map((openTime, j) => {
                        var id1 = "open-" + i + "-" + j;
                        var id2 = "close-" + i + "-" + j;
                        return (
                            <div className="schedule-day ml-3 mt-4" key={j}>
                                <div className="form-check">
                                    <input className="form-check-input" id={j} type="checkbox" value=""
                                           defaultChecked={this.state.schedules[i].openTimes[j].checked}
                                           onChange={(e) => {
                                               var schedules = this.state.schedules;
                                               if(e.target.checked === false) {
                                                   schedules[i].openTimes[j].startTime = 0;
                                                   schedules[i].openTimes[j].endTime = 0;
                                                   document.getElementById(id1).value = 0;
                                                   document.getElementById(id2).value = 0;
                                               }
                                               schedules[i].openTimes[j].checked = e.target.checked;
                                               this.setState({schedules: schedules});
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
                                            var schedules = this.state.schedules;
                                            schedules[i].openTimes[j].startTime = e.target.value;
                                            this.setState({schedules: schedules});
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
                                            var schedules = this.state.schedules;
                                            schedules[i].openTimes[j].endTime = e.target.value;
                                            this.setState({schedules: schedules});
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
        );
    }

    handleExtraButton() {
        const {tabs} = this.state;
        this.createSchedule();
        var i = this.state.schedules.length - 1;
        const newTabs = [...tabs, {title: 'Location ' + (tabs.length + 1), content: this.renderContent(i)}];
        this.setState({tabs: newTabs, activeIndex: newTabs.length - 1});

    }

    handleTabChange(index) {
        this.setState({activeIndex: index});
    }

    handleEdit({type, index}) {
        let {tabs, activeIndex} = this.state;
        if (type === 'delete') {
            tabs.splice(index, 1);
            var schedules = this.state.schedules;
            schedules.splice(index, 1);
            this.setState({schedules: schedules});
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

    findTruckByPhone = (e) => {

        e.preventDefault();

        let errors = this.validateLoginForm();

        if (errors === true) {
            this.yelpService.findTruckByPhone(this.state.formData.email).then((truck) => {
                if (truck !== false) {
                    this.setState({newTruck: truck});
                    $('.modal').modal('hide');
                }
            })
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

    createHoliday = (e) => {
        var holidays = this.state.holidays;
        holidays.push(new Date());
        this.setState({holidays: holidays});
    }

    createSchedule = (e) => {
        var schedules = this.state.schedules;
        schedules.push({
            address: '',
            latitude: '',
            longitude: '',
            openTimes: [
                {day: 1, startTime: 0, endTime: 0, checked: true},
                {day: 2, startTime: 0, endTime: 0, checked: true},
                {day: 3, startTime: 0, endTime: 0, checked: true},
                {day: 4, startTime: 0, endTime: 0, checked: true},
                {day: 5, startTime: 0, endTime: 0, checked: true},
                {day: 6, startTime: 0, endTime: 0, checked: true},
                {day: 7, startTime: 0, endTime: 0, checked: true}
            ]
        });
        this.setState({schedules: schedules});
    }

    validateLoginForm = (e) => {

        let errors = {};
        const {formData} = this.state;

        if (isEmpty(formData.email) || isContainWhiteSpace(formData.email)
            || !isLength(formData.email, {gte: 12, lte: 12, trim: true})) {
            errors.email = "Phone number should be in the format +1XXXXXXXXXX";
        }

        console.log(formData);
        console.log(this.state.schedules);
        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }

    }

    createTruck = (e) => {

        e.preventDefault();

        let errors = this.validateLoginForm();

        if(errors === true){
            console.log(1);
            //this.userService.register({email: this.state.formData.email, password: this.state.formData.password});
        } else {
            alert(errors.email || errors.password);
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    render() {
        const {tabs, activeIndex} = this.state;
        const tabTemplate = [];
        const panelTemplate = [];
        tabs.forEach((tab, i) => {
            const closable = tabs.length > 1;
            tabTemplate.push(<Tab key={i} closable={closable}>Location {i+1}</Tab>);
            panelTemplate.push(<Panel key={i}>
                <PlacesAutocomplete
                    value={this.state.schedules[i].address}
                    onChange={(change) => {
                        var schedules = this.state.schedules;
                        schedules[i].address = change;
                        this.setState({schedules: schedules});
                    }}
                    onSelect={(address) => {
                        geocodeByAddress(address)
                            .then(results => getLatLng(results[0]))
                            .then(latLng => {
                                var schedules = this.state.schedules;
                                schedules[i].address = address;
                                schedules[i].latitude = latLng.lat;
                                schedules[i].longitude = latLng.lng;
                                this.setState({schedules: schedules});
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
        })
        var formname = null;
        var formphone = null;
        var photo1 = null;
        var photo2 = null;
        var photo3 = null;
        if (this.state.newTruck !== {} && this.state.newTruck.photos !== undefined) {
            formname = this.state.newTruck.name;
            formphone = this.state.newTruck.phone;
            photo1 = this.state.newTruck.photos[0].href;
            photo2 = this.state.newTruck.photos[1].href;
            photo3 = this.state.newTruck.photos[2].href;
        }


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
                                        Create your truck page faster by entering the phone number associated with your
                                        Yelp business page.
                                    </div>
                                    <input className="form-control" id="recipient-name" placeholder="+1XXXXXXXXXX"
                                           name="email" type="text" size="14"
                                           alt="PHONE" onChange={this.handleInputChange} required/>
                                </div>
                                <button type="submit" className="btn yelp-btn" name="Submit"><i
                                    className="fa fa-yelp"></i>Connect To Yelp
                                </button>
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
                <div className="container" id="create-container">
                    {modal}
                    <h1 className="display1">Business Information</h1>
                    <div className="yelp-div">
                        <button className="btn yelp-yellow-btn btn-block ripple-effect"
                                onClick={() => $('.modal').modal('show')}>
                            <i className="fa fa-yelp"></i>Fill Out With Yelp
                        </button>
                    </div>
                    <form action="" method="" className="create-form" role="form" onSubmit={this.createTruck}>
                        <div className="row">
                            <div className="col col-2"></div>
                            <div className="col col-4 py-3 mr-3" id="form-info-container">
                                <h5 className="text-center mb-5 ">Basic Information</h5>

                                <div id="form-business-name" className="form-group">
                                    <div className="form-label">Business Name</div>
                                    <input id="business-name" className="form-control" name="name" type="text" size="14"
                                           alt="NAME" defaultValue={formname}
                                           onChange={this.handleInputChange} required/>
                                </div>

                                <div id="form-business-phone" className="form-group">
                                    <div className="form-label">Phone Number</div>
                                    <input id="business-phone" className="form-control" name="phone" type="text"
                                           size="14"
                                           alt="PHONE" defaultValue={formphone} placeholder="+1"
                                           onChange={this.handleInputChange} required/>
                                </div>
                                <div id="form-business-category" className="form-group">
                                    <div className="form-label mb-3">Categories</div>
                                    <div className="row mx-1">
                                    <select className="col form-control category mr-2" id="category1" name="category1"
                                            defaultValue='AMERICAN' onChange={this.handleInputChange} required>
                                    {this.renderCategories()}
                                    </select>
                                    <select className="col form-control category mx-2" id="category2" name="category2"
                                            defaultValue='ASIAN'
                                            onChange={this.handleInputChange} required>
                                        {this.renderCategories()}
                                    </select>
                                    <select className="col form-control category ml-2" id="category3" name="category3"
                                            defaultValue='BREAKFAST' onChange={this.handleInputChange} required>
                                        {this.renderCategories()}
                                    </select>
                                    </div>

                                </div>
                                <div id="form-business-website" className="form-group">
                                    <div className="form-label">Website</div>
                                    <input id="business-website" className="form-control" name="website" type="text"
                                           size="14"
                                           alt="WEBSITE" placeholder="http://"
                                           onChange={this.handleInputChange} required/>
                                </div>
                                <div id="form-business-menu" className="form-group">
                                    <div className="form-label">Menu URL</div>
                                    <input id="business-menu" className="form-control" name="menu" type="text"
                                           size="14"
                                           alt="MENU" placeholder="http://"
                                           onChange={this.handleInputChange} required/>
                                </div>
                                <div id="form-business-twitter" className="form-group">
                                    <div className="form-label">Twitter URL</div>
                                    <input id="business-twitter" className="form-control" name="twitter" type="text"
                                           size="14"
                                           alt="TWITTER" placeholder="http://"
                                           onChange={this.handleInputChange} required/>
                                </div>

                            </div>
                            <div className="col col-4 ml-3 py-3" id="form-schedule-container">
                                <h5 className="text-center mb-5">Regular Schedule</h5>

                                <Tabs onTabEdit={this.handleEdit}
                                      onTabChange={this.handleTabChange}
                                      activeIndex={activeIndex}
                                      customStyle={this.props.customStyle}
                                      ExtraButton={
                                          <ExtraButton onClick={this.handleExtraButton}>
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
                                           defaultValue={photo1} placeholder="http://"
                                           onChange={this.handleInputChange} required/>
                                </div>
                                <div id="form-business-photo2" className="form-group">
                                    <div className="form-label">Photo 2 URL</div>
                                    <input id="business-photo2" className="form-control" name="photo2" type="text"
                                           size="14"
                                           alt="PHOTO2"
                                           defaultValue={photo2} placeholder="http://"
                                           onChange={this.handleInputChange} required/>
                                </div>
                                <div id="form-business-photo3" className="form-group">
                                    <div className="form-label">Photo 3 URL</div>
                                    <input id="business-photo3" className="form-control" name="photo3" type="text"
                                           size="14"
                                           alt="PHOTO3"
                                           defaultValue={photo3} placeholder="http://"
                                           onChange={this.handleInputChange} required/>
                                </div>
                            </div>
                            <div className="col col-4 py-3 ml-3" id="form-holiday-container">
                                <h5 className="text-center mb-5">Holiday List</h5>
                                <div className="add-holiday text-right" onClick={this.createHoliday}>Add Holiday</div>
                                <div className="holiday-list">
                                    {this.state.holidays.map((date, i) => {
                                        return (
                                            <div className="holiday-item" key={i}>
                                                <DatePicker onChange={(pick) => {
                                                    var holidays = this.state.holidays;
                                                    holidays[i] = pick;
                                                    this.setState({holidays: holidays});
                                                }}
                                                            value={this.state.holidays[i]}/>
                                                <a onClick={() => {
                                                    this.setState({
                                                        holidays: this.state.holidays.filter((_, index) => index !== i)
                                                    });
                                                }}>
                                                    <i className="fa fa-times"></i></a></div>)
                                    })}
                                </div>
                            </div>
                            <div className="col col-2"></div>
                        </div>
                        <div className="row mb-1">
                            <button className="btn btn-block ripple-effect create-button" type="submit" name="Submit"
                                    alt="sign in">Save and Preview
                            </button>

                        </div>
                        <div className="text-center pb-5"><a href='/dashboard'>Go back without saving</a></div>
                    </form>
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
