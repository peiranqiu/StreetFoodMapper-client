import React from 'react';
import rating1 from '../resources/icons/rating1.png'
import rating2 from '../resources/icons/rating2.png'
import rating3 from '../resources/icons/rating3.png'
import rating4 from '../resources/icons/rating4.png'
import rating5 from '../resources/icons/rating5.png'

export default class TrendingItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rating = null;
        switch(this.props.truck.reviews[0].rating) {
            case 2:
                rating = rating2;
                break;
            case 3:
                rating = rating3;
                break;
            case 4:
                rating = rating4;
                break;
            case 5:
                rating = rating5;
                break;
            default:
                rating = rating1;
        }
        var href = "/truck/" + this.props.truck.id;
        return (
            <div>
                <div className="card">
                    <p className="card-user">{this.props.truck.reviews[0].userName}</p>
                    <p className="card-time">Wrote a review at {this.props.truck.reviews[0].timeCreated}</p>
                    <img className="card-img-top" src={this.props.truck.photos[1].href} alt="Card image cap"/>
                    <div className="card-body">
                        <div><a className="card-title" href={href}>{this.props.truck.name}</a></div>
                        <img className="card-rating" width="80px" src={rating} alt="Card image cap"/>
                        <p className="card-text">{this.props.truck.reviews[0].text}</p>
                    </div>
                </div>
            </div>
        )
    }
}