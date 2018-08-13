import React from 'react';
import '../styles/home.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import * as constants from '../constants/constant';
import mapIcon from '../resources/icons/map.png'
import mapWhite from '../resources/icons/map-white.png'
import $ from 'jquery'
const allMarkers = [];
const allWindows = [];
var prevInfoWindow = false;
var map = null;

export default class TruckMap
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected:{}
        };
        this.initMap = this.initMap.bind(this);
    }

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
        map = new google.maps.Map(document.getElementById("truckmap"), {
            zoom: 13,
            center: new google.maps.LatLng(42.355, -71.09),
            mapTypeId: 'roadmap',
            streetViewControl: false,
            mapTypeControl: false,
            styles: constants.MAP_STYLE
        });


        this.props.schedules.map((schedule) => {

                var address = " " + schedule.address.substring( 0, schedule.address.indexOf(","));
                var open = " Closed";
                if(schedule.open == true) {
                    open = " Open";
                }

                var lat = Number(schedule.latitude);
                var lng = Number(schedule.longitude);
                var myLatLng = {lat: lat, lng: lng};

                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: mapIcon
                });
                marker.id = schedule.id;

                var infoWindow = new google.maps.InfoWindow({
                    position: myLatLng,
                    content: '<div id="iw-container row">' +
                    '<div class="iw-address"><i class="fa fa-map-marker"></i><a class="iw-address-inner"></a></div>' +
                    '</div>'
                });

                marker.addListener('click', () => {
                    if( prevInfoWindow ) {
                        prevInfoWindow.close();
                    }
                    if(infoWindow.getMap() !== null && typeof infoWindow.getMap() !== "undefined") {
                        marker.setIcon(mapIcon);
                        infoWindow.close();
                    }
                    else {
                        prevInfoWindow = infoWindow;
                        infoWindow.open(map, marker);
                        this.setState({selected:marker.id});
                        marker.setIcon(mapWhite);
                    }
                });
                map.addListener('click', function () {
                    marker.setIcon(mapIcon);
                    infoWindow.close();
                });
                allMarkers.push(marker);
                allWindows.push(infoWindow);

                google.maps.event.addListener(infoWindow, 'domready', function () {
                    $('.iw-address-inner').html(address);

                    // Reference to the DIV that wraps the bottom of infowindow
                    var iwOuter = $('.gm-style-iw');
                    var iwBackground = iwOuter.prev();

                    // Removes background shadow DIV
                    iwBackground.children(':nth-child(2)').css({'display': 'none'});

                    // Removes white background DIV
                    iwBackground.children(':nth-child(4)').css({'display': 'none'});
                    var iwCloseBtn = iwOuter.next();
                    iwCloseBtn.css({display: 'none'});
                    iwBackground.children(':nth-child(3)').attr('style', function(i,s){
                        return s + 'display: none !important;'
                    });
                    $("div:eq(0)", iwBackground).hide();
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
        let openFilter = $('#btn-open').hasClass('active');
        let laterFilter = $('#btn-later').hasClass('active');
        if(this.props.schedules !== []) {
            for(var i=0; i< allMarkers.length; i++) {
                allMarkers[i].setIcon(mapIcon);
                allMarkers[i].setVisible(true);
            }
            this.props.schedules.map((schedule) => {
                if((openFilter && !schedule.open) || (laterFilter && schedule.open)) {
                    for(var i=0; i< allMarkers.length; i++) {
                        if(allMarkers[i].id === schedule.id) {
                            allMarkers[i].setVisible(false);
                            break;
                        }
                    }
                }})
        }
        return (
               <div id="truckmap"></div>
        );
    }

}