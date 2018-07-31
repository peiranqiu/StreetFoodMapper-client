import React from 'react';
import '../styles/home.css';
import '../styles/map.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import * as constants from '../constants/constant';
import mapIcon from '../resources/icons/map.png'
import $ from 'jquery'

export default class MapView
    extends React.Component {
    constructor() {
        super();
        this.state = {
            trucks: []
        };
        this.initMap = this.initMap.bind(this);
        this.setTrucks = this.setTrucks.bind(this);
    }

    setTrucks(trucks) {
        this.setState({trucks: trucks});
    }

    componentWillReceiveProps(newProps) {
        this.setTrucks(newProps.trucks);
    }

    componentDidMount() {
        this.setTrucks(this.props.trucks);
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

        var prevInfoWindow = false;
        this.state.trucks.map((truck) => {
            var name = truck.name;
            var photo = truck.photos[0].href;
            var category = truck.category1 + ', ' + truck.category2 + ', ' + truck.category3;
            truck.schedules.map((schedule) => {
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

                var infoWindow = new google.maps.InfoWindow({
                    position: myLatLng,
                    content: '<div id="iw-container row">' +
                    '<img class="iw-img" src="replace" alt="" height="90" width="90">' +
                    '<div class="iw-title"></div>' +
                    '<div class="iw-subTitle"></div>' +
                    '<div class="iw-open"><i class="fa fa-clock-o"></i><a class="iw-open-inner"></a></div>' +
                    '<div class="iw-address"><i class="fa fa-map-marker"></i><a class="iw-address-inner"></a></div>' +
                    '</div>'
                });
                marker.addListener('click', function () {
                    console.log(prevInfoWindow);
                    if( prevInfoWindow ) {
                        prevInfoWindow.close();
                    }
                    if(infoWindow.getMap() !== null && typeof infoWindow.getMap() !== "undefined") {
                        infoWindow.close();
                    }
                    else {
                        prevInfoWindow = infoWindow;
                        infoWindow.open(map, marker);
                    }
                });
                map.addListener('click', function () {
                    infoWindow.close();
                });


                google.maps.event.addListener(infoWindow, 'domready', function () {

                    $('img[src="replace"]').attr('src', photo);
                    $('.iw-title').html(name);
                    $('.iw-subTitle').html(category);
                    $('.iw-open-inner').html(open);
                    $('.iw-address-inner').html(address);

                    // Reference to the DIV that wraps the bottom of infowindow
                    var iwOuter = $('.gm-style-iw');

                    /* Since this div is in a position prior to .gm-div style-iw.
                     * We use jQuery and create a iwBackground variable,
                     * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
                    */
                    var iwBackground = iwOuter.prev();

                    // Removes background shadow DIV
                    iwBackground.children(':nth-child(2)').css({'display': 'none'});

                    // Removes white background DIV
                    iwBackground.children(':nth-child(4)').css({'display': 'none'});
                    var iwCloseBtn = iwOuter.next();

                    iwCloseBtn.css({transform: 'translate(330px,15px)'});
                });
            })
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