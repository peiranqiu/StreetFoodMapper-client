import React from 'react';
import '../../node_modules/bootstrap/js/dist/dropdown.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../styles/home.css';
import TrendingItem from "../components/TrendingItem"
import TruckServiceClient from "../services/TruckServiceClient";

export default class TrendingContainer
    extends React.Component {
    constructor() {
        super();
        this.state = {
            trucks: []
        };
        this.truckService = TruckServiceClient.instance();
    }

    componentDidMount() {
        this.truckService.findAllTrucks()
            .then(trucks => this.setState({trucks: trucks}));
    }

    render() {
        if (this.state.trucks.length < 1) {
            return (
                <div className="container-fluid" id="trending-container">
                    <div className="trending-loader">Loading ...</div>
                </div>
            );
        }
        return (
            <div className="container-fluid" id="trending-container">
                <h1 className="display1">Trending</h1>
                <div className="row">
                    <div className="col-sm-4"><TrendingItem truck={this.state.trucks[0]}/></div>
                    <div className="col-sm-4"><TrendingItem truck={this.state.trucks[1]}/></div>
                    <div className="col-sm-4"><TrendingItem truck={this.state.trucks[0]}/></div>
                </div>
            </div>
        );
    }

}