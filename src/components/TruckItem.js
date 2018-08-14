import React from 'react';
import unfavorite from '../resources/icons/unfavorite.png'
import favorite from '../resources/icons/favorite.png'
import '../../node_modules/font-awesome/css/font-awesome.css';
import FavoriteServiceClient from "../services/FavoriteServiceClient";

export default class TruckItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFav: false
        };
        this.favoriteService = FavoriteServiceClient.instance();
    }

    componentDidMount() {
        this.favoriteService.findFavorite(this.props.schedule.id)
            .then((isFav) => this.setState({isFav: isFav}));
    }

    selectingTruck = () => {
        this.props.scheduleCallbackFromParent(this.props.schedule);
        this.props.truckCallbackFromParent(this.props.truck);
    }

    handleFavorite() {
        if (this.state.isFav) {
            this.favoriteService.userUnlikesSchedule(this.props.schedule.id);
            this.setState({isFav: false});
        }
        else {
            this.favoriteService.userLikesSchedule(this.props.schedule.id);
            this.setState({isFav: true});
        }
    }

    render() {
        var newClass = "list-group-item list-group-item-action flex-column align-items-start";
        if (this.props.selectedSchedule !== null && this.props.selectedSchedule !== undefined) {
            if (this.props.selectedSchedule.id === this.props.schedule.id) {
                newClass = newClass + " active";
            }
        }
        var address = " " + this.props.schedule.address.substring(0, this.props.schedule.address.indexOf(","));
        var href = "/truck/" + this.props.truck.id.toString();
        var fav = unfavorite;
        if (this.state.isFav) {
            fav = favorite;
        }
        return (
            <div className={newClass} onClick={this.selectingTruck}>
                <div className="row justify-content-between" id="truck-item">
                    <img className="truck-item-img"
                         src={this.props.truck.photos[this.props.schedule.id % 3].href}/>
                    <a className="truck-item-title" href={href}>{this.props.truck.name}</a>
                    <div className="truck-item-category">
                        {this.props.truck.category1.charAt(0) + this.props.truck.category1.substring(1).toLowerCase()},
                        {this.props.truck.category2.charAt(0) + this.props.truck.category2.substring(1).toLowerCase()},
                        {this.props.truck.category3.charAt(0) + this.props.truck.category3.substring(1).toLowerCase()}
                    </div>
                    <div className="truck-item-open"><i className="fa fa-clock-o"></i>
                        {this.props.schedule.open && <a className="truck-item-content open">Open</a>}
                        {!this.props.schedule.open && <a className="truck-item-content">Closed</a>}
                    </div>
                    <div className="truck-item-address"><i className="fa fa-map-marker"></i><a
                        className="truck-item-content">{address}</a>
                    </div>
                    <img className="truck-item-icon" id="fav-btn" src={fav}
                         onClick={() => {
                             if (this.props.user === undefined) {
                                 alert("Please log in to use this feature");
                                 return;
                             }
                             this.handleFavorite();
                             this.selectingTruck();
                             this.setState({refresh: true});
                         }}/>
                </div>
            </div>

        )
    }
}