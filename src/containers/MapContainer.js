import React from 'react';
import '../../node_modules/bootstrap/js/dist/dropdown.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../styles/home.css';
import MapView from './MapView';
import ListView from './ListView';
import TruckServiceClient from "../services/TruckServiceClient";

export default class MapContainer
    extends React.Component {
    constructor() {
        super();
        this.state = {
            trucks: [],
            user: {}
        };
        this.truckService = TruckServiceClient.instance();
        this.setUser = this.setUser.bind(this);
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
            .then(trucks => this.setState({trucks: trucks}));
    }

    render() {

        if (this.state.trucks.length < 1) {
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
                               aria-label="Search" id="search-input"  size="14"/>
                            <i className="fa fa-search" id="search-icon" aria-hidden="true"></i>
                    </form>
                    <button type="button" className="btn shadow" id="btn-open">Open Now</button>
                    <button type="button" className="btn shadow" id="btn-later">Open Later</button>
                    <button type="button" className="btn shadow" id="btn-favorite">Favorites</button>
                    <div className="col-sm-4"><ListView trucks={this.state.trucks} user={this.state.user}/></div>
                    <div className="col-sm-8"><MapView trucks={this.state.trucks} user={this.state.user}/></div>
                </div>
            </div>
        );

    }


}