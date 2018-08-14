import React from 'react';
import '../../node_modules/bootstrap/js/dist/dropdown.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../styles/home.css';
import MapView from './MapView';
import TruckItem from '../components/TruckItem';
import TruckServiceClient from "../services/TruckServiceClient";
import ScheduleServiceClient from "../services/ScheduleServiceClient";
import FavoriteServiceClient from "../services/FavoriteServiceClient";
import loader from "../resources/background/loader.gif"
import $ from 'jquery'
import UserServiceClient from "../services/UserServiceClient";

export default class MapContainer
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trucks: [],
            user: {},
            favorites: [],
            refresh: false,
            search: "",
            selectedSchedule: null,
            selectedTruck: null
        };
        this.truckService = TruckServiceClient.instance();
        this.userService = UserServiceClient.instance();
        this.scheduleService = ScheduleServiceClient.instance();
        this.favoriteService = FavoriteServiceClient.instance();
        this.scheduleCallback = this.scheduleCallback.bind(this);
        this.truckCallback = this.truckCallback.bind(this);
        this.refreshTrucks = this.refreshTrucks.bind(this);
    }

    scheduleCallback = (selectedSchedule) => {
        this.setState({selectedSchedule: selectedSchedule});
        if(this.state.user !== undefined) {
            this.favoriteService.findFavoritesForUser(this.state.user.id)
                .then((favorites) => {
                    this.setState({favorites: favorites})
                });
        }
    }
    truckCallback = (selectedTruck) => {
        this.setState({selectedTruck: selectedTruck});
        if(this.state.user !== undefined) {
            this.favoriteService.findFavoritesForUser(this.state.user.id)
                .then((favorites) => {
                    this.setState({favorites: favorites})
                });
        }
    }

    componentDidMount() {
        this.userService.findCurrentUser()
            .then(user => {
                this.setState({user: user});
                if(user !== undefined) {
                    this.favoriteService.findFavoritesForUser(user.id)
                        .then((favorites) => {
                            this.setState({favorites: favorites})
                        });
                }
            });
        this.truckService.findAllTrucks()
            .then((trucks) => {
                this.setState({trucks: trucks});
                this.refreshTrucks(trucks);
            });
    }

    refreshTrucks(trucks) {
        var now = new Date();
        var day = now.getDay();
        if (day === 0) {
            day = 7;
        }
        var hourMinute = now.getHours() * 100 + now.getMinutes();

        trucks.map((truck) => (
            truck.schedules.map((schedule) => {
                schedule.openTimes.map((time) => {

                    if (day === time.day) {
                        if (hourMinute > time.startTime && hourMinute < time.endTime) {
                            schedule.open = true;
                        }
                        else {
                            schedule.open = false;
                        }
                        this.scheduleService.updateSchedule(truck.id, schedule.id, schedule);
                        return;
                    }
                })
            })));
    }


    renderListOfTrucks() {
        let openFilter = $('#btn-open').hasClass('active');
        let laterFilter = $('#btn-later').hasClass('active');
        let favoriteFilter = $('#btn-favorite').hasClass('active');
        let searching = $('#search-icon').hasClass('fa-times');

        let trucks = this.state.trucks.slice().reverse().map((truck) => {
            if (searching
                && !(truck.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.search.toLowerCase())
                    || truck.category1.toString().toLowerCase() === (this.state.search.toLowerCase())
                    || truck.category2.toString().toLowerCase() === (this.state.search.toLowerCase())
                    || truck.category3.toString().toLowerCase() === (this.state.search.toLowerCase()))) {
                return null;
            }
            return (
                truck.schedules.map((schedule) => {
                    if ((openFilter && !schedule.open)
                        || (laterFilter && schedule.open)) {
                        return null;
                    }
                    if (favoriteFilter) {
                        var isFav = false;
                        this.state.favorites.map((favorite) => {
                            if (schedule.id === favorite.id) {
                                isFav = true;
                            }
                        });
                        if (isFav === false) {
                            return null;
                        }
                    }
                    return (<TruckItem key={schedule.id}
                                       scheduleCallbackFromParent={this.scheduleCallback}
                                       truckCallbackFromParent={this.truckCallback}
                                       selectedTruck={this.state.selectedTruck}
                                       selectedSchedule={this.state.selectedSchedule}
                                       user={this.state.user}
                                       schedule={schedule}
                                       truck={truck}/>);
                }))
        });
        return trucks;

    }

    render() {
        if (this.state.trucks.length < 1) {
            return (
                <div className="container-fluid" id="map-container">
                    <div className="map-loader"><img alt="" src={loader}/></div>
                </div>
            );
        }
        if (this.state.search.length === 0 && $('#search-icon').hasClass('fa-times')) {
            $('#search-icon').removeClass('fa-times');
            $('#search-icon').addClass('fa-search');
        }

        return (
            <div className="table m-0 p-0" id="map-container">
                <div className="row m-0 p-0">
                    <form className="form-inline active-purple-4" id="home-search">
                        <input className="form-control form-control-sm mr-3 w-100 shadow" type="text"
                               placeholder="  Search for trucks & categories"
                               aria-label="Search" id="search-input" autoComplete="off" size="14"
                               onChange={(e) => {
                                   this.setState({search: e.target.value});
                               }}
                        />
                        <i className="fa fa-search" id="search-icon" aria-hidden="true" onClick={() => {
                            if ($('#search-icon').hasClass('fa-search')) {
                                $('#search-icon').removeClass('fa-search');
                                $('#search-icon').addClass('fa-times');
                            }
                            else {
                                $('#search-icon').removeClass('fa-times');
                                $('#search-icon').addClass('fa-search');
                                document.getElementById("search-input").value = "";
                                this.setState({search: ""});
                            }
                            this.setState({refresh: true});
                        }}/>
                    </form>
                    <button type="button" data-toggle="button" className="btn shadow" id="btn-open"
                            onClick={() => {
                                if ($('#btn-open').hasClass('active')) {
                                    $('#btn-later').removeClass('active');
                                    $('#btn-favorite').removeClass('active');
                                }
                                this.setState({refresh: true});
                            }}>Open Now
                    </button>
                    <button type="button" data-toggle="button" className="btn shadow" id="btn-later"
                            onClick={() => {
                                if ($('#btn-later').hasClass('active')) {
                                    $('#btn-open').removeClass('active');
                                    $('#btn-favorite').removeClass('active');
                                }
                                this.setState({refresh: true});
                            }}>Open Later
                    </button>
                    <button type="button" data-toggle="button" className="btn shadow" id="btn-favorite"
                            onClick={() => {
                                if (this.state.user === undefined) {
                                    alert("Please log in to use this feature");
                                    $('#btn-favorite').removeClass('active');
                                    return;
                                }
                                if ($('#btn-favorite').hasClass('active')) {
                                    $('#btn-open').removeClass('active');
                                    $('#btn-later').removeClass('active');
                                }
                            }}>Favorites
                    </button>
                    <div className="table-cell m-0 p-0 col-left">
                        <div className="list-view p-0">
                            <div className="list-header">Find Trucks</div>
                            <div className="list-group p-0">
                                <div id="background-test">Whoops! No trucks found.</div>
                                {this.state.trucks !== undefined && this.renderListOfTrucks()}
                            </div>
                        </div>
                    </div>
                    <div className="table-cell m-0 p-0 col-right">
                        <MapView scheduleCallbackFromParent={this.scheduleCallback}
                                 truckCallbackFromParent={this.truckCallback}
                                 selectedTruck={this.state.selectedTruck}
                                 selectedSchedule={this.state.selectedSchedule}
                                 search={this.state.search}
                                 favorites = {this.state.favorites}
                                 trucks={this.state.trucks} user={this.state.user}/>
                    </div>
                </div>
            </div>
        );

    }


}