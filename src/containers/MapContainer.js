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
                    <div className="col-sm-4"><ListView trucks={this.state.trucks}/></div>
                    <div className="col-sm-8"><MapView trucks={this.state.trucks}/></div>
                </div>
            </div>
        );

    }


}