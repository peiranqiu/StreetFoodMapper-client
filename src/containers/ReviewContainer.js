import React from 'react';
import '../../node_modules/bootstrap/js/dist/dropdown.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../styles/home.css';
import loader from "../resources/background/loader.svg"
import ReactSVG from 'react-svg'


export default class ReviewContainer
    extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.truck.reviews < 1) {
            return (
                <div className="container-fluid" id="review-container">
                    <div className="trending-loader"><ReactSVG path={loader}/></div>
                </div>
            );
        }
        return (
            <div className="container-fluid" id="review-container">
                <h1 className="display1">Reviews</h1>
                <div className="row">
                    <div className="col-sm-4"></div>
                </div>
            </div>
        );
    }

}