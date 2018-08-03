import React from 'react';
import rating1 from '../resources/icons/rating1.png'
import rating2 from '../resources/icons/rating2.png'
import rating3 from '../resources/icons/rating3.png'
import rating4 from '../resources/icons/rating4.png'
import rating5 from '../resources/icons/rating5.png'

export default class FeedItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.index);
        var rating = null;
        if(this.props.truck.photos !== undefined && this.props.truck.reviews !== undefined && this.props.index !== undefined
        && this.props.truck.photos.length > 0 && this.props.truck.reviews.length > 0) {
            switch(this.props.truck.reviews[this.props.index].rating) {
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

        return (
            <div>
                <div className="card">
                    <p className="card-user">{this.props.truck.reviews[this.props.index].userName}</p>
                    <p className="card-time">Wrote a review at {this.props.truck.reviews[this.props.index].timeCreated}</p>
                    <img className="card-img-top" src={this.props.truck.photos[this.props.index].href} alt="Card image cap"/>
                    <div className="card-body">
                        <img className="card-rating" width="80px" src={rating} alt="Card image cap"/>
                        <p className="card-text">{this.props.truck.reviews[this.props.index].text}</p>
                    </div>
                </div>
            </div>
        )
    }
        return null;
    }
}