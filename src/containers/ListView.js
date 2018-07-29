import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../styles/home.css';

import TruckItem from '../components/TruckItem'
import TruckServiceClient from '../services/TruckServiceClient'

export default class ListView
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

    renderListOfTrucks() {
        let trucks = this.state.trucks.map((truck) => {

            return (<TruckItem key={truck.id}
                                    truck={truck}/>)
        });
        return trucks;

    }
    render() {
        return (
            <div className="list-view">
                <div className="list-header">Find Trucks</div>
                    <div className="list-group">
                        {this.renderListOfTrucks()}
                        {this.renderListOfTrucks()}
                        {this.renderListOfTrucks()}

                </div>
            </div>
        );
    }

}