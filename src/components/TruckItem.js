import React from 'react';
import unfavorite from '../resources/icons/unfavorite.png'
import '../../node_modules/font-awesome/css/font-awesome.css';

export default class TruckItem extends React.Component {
    constructor(props) {
        super(props);
    }

    selectingTruck = () => {
        this.props.scheduleCallbackFromParent(this.props.schedule);
        this.props.truckCallbackFromParent(this.props.truck);
    }

    render() {
        var newClass = "list-group-item list-group-item-action flex-column align-items-start";
        if(this.props.selectedSchedule !== null && this.props.selectedSchedule !== undefined) {
            if (this.props.selectedSchedule.id === this.props.schedule.id) {
                newClass = newClass + " active";
            }
        }
        var address = " " + this.props.schedule.address.substring( 0, this.props.schedule.address.indexOf(","));
        var href = "/truck/" + this.props.truck.id.toString();
        return (
            <div className={newClass} onClick={this.selectingTruck}>
                <div className="row justify-content-between" id="truck-item">
                    <img className="truck-item-img"
                         src={this.props.truck.photos[this.props.schedule.id%3].href}/>
                    <a className="truck-item-title" href={href}>{this.props.truck.name}</a>
                    <div className="truck-item-category">
                        {this.props.truck.category1}, {this.props.truck.category2}, {this.props.truck.category3}</div>
                    <div className="truck-item-open"><i className="fa fa-clock-o"></i>
                        {this.props.schedule.open && <a className="truck-item-content open">Open</a>}
                        {!this.props.schedule.open && <a className="truck-item-content">Closed</a>}
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