import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../styles/home.css';

import TruckItem from '../components/TruckItem'

export default class ListView
    extends React.Component {
    constructor() {
        super();
        this.state = {
            trucks: [],
            user: {}
        };
        this.setTrucks = this.setTrucks.bind(this);
        this.setUser = this.setUser.bind(this);
    }
    setUser(user) {
        this.setState({user: user});
    }

    setTrucks(trucks) {
        this.setState({trucks: trucks});
    }

    componentWillReceiveProps(newProps) {
        this.setUser(newProps.user);
        this.setTrucks(newProps.trucks);
    }

    componentDidMount() {
        this.setUser(this.props.user);
        this.setTrucks(this.props.trucks);
    }

    renderListOfTrucks() {
        let trucks = this.state.trucks.map((truck) => {
            return (
            truck.schedules.map((schedule) => {
            return (<TruckItem key={schedule.id}
                               user={this.state.user}
                               schedule={schedule}
                               truck={truck}/>)}))
        });
        return trucks;

    }
    render() {
        return (
            <div className="list-view">
                <div className="list-header">Find Trucks</div>
                    <div className="list-group">
                        {this.renderListOfTrucks()}

                </div>
            </div>
        );
    }

}