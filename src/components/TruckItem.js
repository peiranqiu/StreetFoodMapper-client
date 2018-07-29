
import React from 'react';
import unfavorite from '../resources/icons/unfavorite.png'

export default class TruckItem extends React.Component {
    constructor(props) { super(props); }
    componentDidMount() {
        console.log(this.props.truck.photos[0].href);

    }


    render() {
        return (
            <a className="list-group-item list-group-item-action flex-column align-items-start">

                <div className="row justify-content-between">
                    <img className="truck-item-img"
                         src={this.props.truck.photos[0].href}/>
                    <div className="truck-item-title">{this.props.truck.name}</div>
                    <div className="truck-item-category">
                        {this.props.truck.category1}, {this.props.truck.category2}, {this.props.truck.category3}</div>
                    <img className="truck-item-icon"
                         src={unfavorite}/>
                </div>
            </a>

        )
    }
}