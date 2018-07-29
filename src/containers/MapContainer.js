import React from 'react';
import '../../node_modules/bootstrap/js/dist/dropdown.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../styles/home.css';
import MapView from './MapView';
import ListView from './ListView';

export default class MapContainer
    extends React.Component {
    render() {
        return (
            <div className="container-fluid" id="map-container">
            <div className="row ">
                <div className="col-sm-4"><ListView/></div>
                <div className="col-sm-8"><MapView/></div>
            </div>
            </div>
        );
    }

}