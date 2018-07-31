import React from 'react';
import '../styles/home.css';
import '../styles/map.css';
import * as constants from '../constants/constant';
import mapIcon from '../resources/icons/map.png'
import $ from 'jquery'

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
                content: '<div id="iw-container">' +
                '<div class="iw-title"></div>' +
                '<div class="iw-content">' +
                '<div class="iw-subTitle">History</div>' +
                '<img class="iw-img" src="replace" alt="" height="90" width="90">' +
                '</div>' +
                '</div>'
            });
            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
            map.addListener('click', function () {
                infoWindow.close();
            });


            google.maps.event.addListener(infoWindow, 'domready', function() {
                var newSrc = "http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg";
                $('img[src="replace"]').attr('src', newSrc);

                $('.iw-title').html(schedule.address);

                // Reference to the DIV that wraps the bottom of infowindow
               var iwOuter = $('.gm-style-iw');

                /* Since this div is in a position prior to .gm-div style-iw.
                 * We use jQuery and create a iwBackground variable,
                 * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
                */
               var iwBackground = iwOuter.prev();

                // Removes background shadow DIV
               iwBackground.children(':nth-child(2)').css({'display' : 'none'});

                // Removes white background DIV
               iwBackground.children(':nth-child(4)').css({'display' : 'none'});
                var iwCloseBtn = iwOuter.next();

                // Apply the desired effect to the close button
                iwCloseBtn.css({transform: 'translate(-40px,10px)'});

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