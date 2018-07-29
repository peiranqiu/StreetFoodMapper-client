import React from 'react';
import '../styles/home.css';
import * as constants from '../constants/constant';
import mapIcon from '../resources/icons/map.png'

export default class MapView
    extends React.Component {

    componentDidMount() {
        window.initMap = this.initMap;
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=" + constants.GOOGLE_MAP_KEY + "&callback=initMap";
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }

    initMap() {
        const google = window.google;
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 13,
            center: new google.maps.LatLng(42.355,-71.09),
            mapTypeId: 'roadmap',
            streetViewControl: false,
            mapTypeControl: false,
            styles: constants.MAP_STYLE
        });


        var myLatLng = {lat: 42.355, lng: -71.09};
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: mapIcon
        });
        var contentString = '<div id="content">'+
            '<div id="siteNotice"></div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'Northern Territory, central Australia. It lies Heritage Site.</p> '+
            '</div></div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
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