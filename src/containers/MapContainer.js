import React from 'react';
import '../../node_modules/bootstrap/js/dist/dropdown.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../styles/home.css';
import MapView from './MapView';
import ListView from './ListView';
import TruckServiceClient from "../services/TruckServiceClient";
import ScheduleServiceClient from "../services/ScheduleServiceClient";

export default class MapContainer
    extends React.Component {
    constructor() {
        super();
        this.state = {
            trucks: [],
            schedules: []
        };
        this.truckService = TruckServiceClient.instance();
        this.scheduleService = ScheduleServiceClient.instance();
    }

    componentDidMount() {
        this.truckService.findAllTrucks()
            .then(trucks => this.setState({trucks: trucks}));
        this.scheduleService.findAllSchedules()
            .then(schedules => this.setState({schedules: schedules}));
    }

    render() {

        if (this.state.trucks.length < 1 || this.state.schedules.length < 1) {
            return (
                <div className="container-fluid" id="map-container">
                    <div className="map-loader">Loading ...</div>
                </div>
            );
        }
        return (
            <div className="container-fluid" id="map-container">
                <div className="row ">
                    <form className="form-inline active-purple-4" id="home-search">
                        <input className="form-control form-control-sm mr-3 w-100 shadow" type="text"
                               placeholder="  Search for trucks, categories, etc."
                               aria-label="Search" id="search-input"/>
                            <i className="fa fa-search" id="search-icon" aria-hidden="true"></i>
                    </form>
                    <button type="button" className="btn shadow" id="btn-open">Open Now</button>
                    <button type="button" className="btn shadow" id="btn-later">Open Later</button>
                    <button type="button" className="btn shadow" id="btn-favorite">Favorites</button>
                    <div className="col-sm-4"><ListView trucks={this.state.trucks}/></div>
                    <div className="col-sm-8"><MapView trucks={this.state.trucks}/></div>
                </div>
            </div>
        );

    }


}