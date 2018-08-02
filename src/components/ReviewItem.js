import React from 'react';
import rating1 from '../resources/icons/rating1.png'
import rating2 from '../resources/icons/rating2.png'
import rating3 from '../resources/icons/rating3.png'
import rating4 from '../resources/icons/rating4.png'
import rating5 from '../resources/icons/rating5.png'

export default class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rating = null;
        switch(this.props.reviews.rating) {
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
                    <p className="card-user">{this.props.review.userName}</p>
                    <p className="card-time">Wrote a review at {this.props.review.timeCreated}</p>
                    <div className="card-body">
                        <hr/>
                        <img className="card-rating" src={rating} alt="Card image cap"/>
                        <p className="card-text">{this.props.review.text}</p>
                    </div>
                </div>
            </div>
        )
    }
}