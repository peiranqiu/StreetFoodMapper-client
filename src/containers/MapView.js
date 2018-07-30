import React from 'react';
import '../styles/home.css';
import * as constants from '../constants/constant';
import mapIcon from '../resources/icons/map.png'

export default class MapView
    extends React.Component {
    constructor() {
        super();
        this.state = {
            trucks: [],
            schedules: []
        };
        this.initMap = this.initMap.bind(this);
        this.setSchedules = this.setSchedules.bind(this);
    }

    setSchedules(schedules) {
        this.setState({schedules: schedules});
    }

    componentWillReceiveProps(newProps) {
        this.setSchedules(newProps.schedules);
    }

    componentDidMount() {
        this.setSchedules(this.props.schedules);
        window.initMap = this.initMap;
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=" + constants.GOOGLE_MAP_KEY + "&callback=initMap";
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }

    initMap() {
        const google = window.google;
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 13,
            center: new google.maps.LatLng(42.355, -71.09),
            mapTypeId: 'roadmap',
            streetViewControl: false,
            mapTypeControl: false,
            styles: constants.MAP_STYLE
        });

        this.state.schedules.map((schedule) => {
            var lat = Number(schedule.latitude);
            var lng = Number(schedule.longitude);
            var myLatLng = {lat: lat, lng: lng};

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: mapIcon
            });

            var infoWindow = new google.maps.InfoWindow({
                position: myLatLng,
                content: "Joann",

                maxWidth: 400
            });
            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        });
    }


    loadJS(src) {
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }

    render() {
        return (
            <div id="map"></div>
        );
    }

}