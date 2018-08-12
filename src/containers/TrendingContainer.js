import React from 'react';
import '../../node_modules/bootstrap/js/dist/dropdown.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../styles/home.css';
import TrendingItem from "../components/TrendingItem"
import TruckServiceClient from "../services/TruckServiceClient";
import loader from "../resources/background/loader.gif"


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
            return null;
        }
        return (
            <div className="container" id="trending-container">
                <div className="row">
                    <div className="col col-1"></div>
                    <div className="col">
                        <h1 className="trending-title">Trending</h1>
                        <hr/>
                        <div className="row trending-row">
                            <div className="col"><TrendingItem truck={this.state.trucks[0]}/></div>
                            <div className="col"><TrendingItem truck={this.state.trucks[4]}/></div>
                            <div className="col"><TrendingItem truck={this.state.trucks[5]}/></div></div></div>
                    <div className="col col-1"></div>
                </div>
            </div>
        );
    }

}