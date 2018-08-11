import React from 'react';
import '../../node_modules/bootstrap/js/dist/dropdown.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../styles/home.css';
import MapView from './MapView';
import TruckItem from '../components/TruckItem';
import TruckServiceClient from "../services/TruckServiceClient";
import ScheduleServiceClient from "../services/ScheduleServiceClient";
import loader from "../resources/background/loader.gif"
import ReactSVG from 'react-svg'
import $ from 'jquery'

export default class MapContainer
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trucks: [],
            user: {},
            refresh: false,
            selectedSchedule: null,
            selectedTruck: null
        };
        this.truckService = TruckServiceClient.instance();
        this.scheduleService = ScheduleServiceClient.instance();
        this.setUser = this.setUser.bind(this);
        this.scheduleCallback = this.scheduleCallback.bind(this);
        this.truckCallback = this.truckCallback.bind(this);
        this.refreshTrucks = this.refreshTrucks.bind(this);
    }

    scheduleCallback = (selectedSchedule) => {
        this.setState({selectedSchedule: selectedSchedule});
    }
    truckCallback = (selectedTruck) => {
        this.setState({selectedTruck: selectedTruck});
    }

    setUser(user) {
        this.setState({user: user});
    }

    componentWillReceiveProps(newProps) {
        this.setUser(newProps.user);
    }

    componentDidMount() {
        this.setUser(this.props.user);
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

        let trucks = this.state.trucks.map((truck) => {
            return (
                truck.schedules.map((schedule) => {
                    if((openFilter && !schedule.open) || (laterFilter && schedule.open)) {
                        return null;
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


        return (
            <div className="table m-0 p-0" id="map-container">
                <div className="row m-0 p-0">
                    <form className="form-inline active-purple-4" id="home-search">
                        <input className="form-control form-control-sm mr-3 w-100 shadow" type="text"
                               placeholder="  Search for trucks & categories"
                               aria-label="Search" id="search-input" size="14"/>
                        <i className="fa fa-search" id="search-icon" aria-hidden="true"></i>
                    </form>
                    <button type="button" data-toggle="button" className="btn shadow" id="btn-open"
                            onClick={() => {
                                if($('#btn-open').hasClass('active')) {
                                    $('#btn-later').removeClass('active');
                                    $('#btn-favorite').removeClass('active');
                                }
                                this.setState({refresh:true});
                            }}>Open Now
                    </button>
                    <button type="button" data-toggle="button" className="btn shadow" id="btn-later"
                            onClick={() => {
                                if($('#btn-later').hasClass('active')) {
                                    $('#btn-open').removeClass('active');
                                    $('#btn-favorite').removeClass('active');
                                }
                                this.setState({refresh:true});
                            }}>Open Later
                    </button>
                    <button type="button" data-toggle="button" className="btn shadow" id="btn-favorite"
                            onClick={() => {
                                if($('#btn-favorite').hasClass('active')) {
                                    $('#btn-open').removeClass('active');
                                    $('#btn-later').removeClass('active');
                                }
                                this.setState({refresh:true});
                            }}>Favorites
                    </button>
                    <div className="table-cell m-0 p-0 col-left">
                        <div className="list-view">
                            <div className="list-header">Find Trucks</div>
                            <div className="list-group">
                                {this.renderListOfTrucks()}
                            </div>
                        </div>
                    </div>
                    <div className="table-cell m-0 p-0 col-right">
                        <MapView scheduleCallbackFromParent={this.scheduleCallback}
                                 truckCallbackFromParent={this.truckCallback}
                                 selectedTruck={this.state.selectedTruck}
                                 selectedSchedule={this.state.selectedSchedule}
                                 trucks={this.state.trucks} user={this.state.user}/>
                    </div>
                </div>
            </div>
        );

    }


}