import React from 'react';
import unfavorite from '../resources/icons/unfavorite.png'
import '../../node_modules/font-awesome/css/font-awesome.css';

export default class TruckItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var open = " Closed";
        if(this.props.schedule.open == true) {
            open = " Open";
        }
        var address = " " + this.props.schedule.address.substring( 0, this.props.schedule.address.indexOf(","));
        return (
            <div className="list-group-item list-group-item-action flex-column align-items-start">

                <div className="row justify-content-between" id="truck-item">
                    <img className="truck-item-img"
                         src={this.props.truck.photos[this.props.schedule.id%3].href}/>
                    <div className="truck-item-title">{this.props.truck.name}</div>
                    <div className="truck-item-category">
                        {this.props.truck.category1}, {this.props.truck.category2}, {this.props.truck.category3}</div>
                    <div className="truck-item-open"><i className="fa fa-clock-o"></i>
                        <a className="truck-item-content">{open}</a>
                    </div>
                    <div className="truck-item-address"><i className="fa fa-map-marker"></i><a
                        className="truck-item-content">{address}</a>
                    </div>
                    <img className="truck-item-icon" src={unfavorite}/>
                </div>
            </div>

        )
    }
}