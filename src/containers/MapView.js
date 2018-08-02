import React from 'react';
import '../styles/home.css';
import '../styles/map.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import * as constants from '../constants/constant';
import mapIcon from '../resources/icons/map.png'
import unfavorite from '../resources/icons/unfavorite.png'
import $ from 'jquery'
const allMarkers = [];
const allWindows = [];
var prevInfoWindow = false;
var map = null;

export default class MapView
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trucks: [],
            user: {}
        };
        this.initMap = this.initMap.bind(this);
        this.setTrucks = this.setTrucks.bind(this);
        this.setUser = this.setUser.bind(this);
        this.initMap = this.initMap.bind(this);
    }

    selectingTruck = (schedule, truck) => {
        this.props.scheduleCallbackFromParent(schedule);
        this.props.truckCallbackFromParent(truck);
    }


    setUser(user) {
        this.setState({user: user});
    }

    setTrucks(trucks) {
        this.setState({trucks: trucks});
    }

    componentWillReceiveProps(newProps) {
        this.setUser(newProps.user);
        this.setTrucks(newProps.trucks);

    }

    componentDidMount() {
        this.setUser(this.props.user);
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
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 13,
            center: new google.maps.LatLng(42.355, -71.09),
            mapTypeId: 'roadmap',
            streetViewControl: false,
            mapTypeControl: false,
            styles: constants.MAP_STYLE
        });


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
                marker.id = schedule.id;

                var infoWindow = new google.maps.InfoWindow({
                    position: myLatLng,
                    content: '<div id="iw-container row">' +
                    '<img class="iw-img" src="replace" alt="" height="90" width="90">' +
                    '<div class="iw-title"></div>' +
                    '<div class="iw-subTitle"></div>' +
                    '<div class="iw-open"><i class="fa fa-clock-o"></i><a class="iw-open-inner"></a></div>' +
                    '<div class="iw-address"><i class="fa fa-map-marker"></i><a class="iw-address-inner"></a></div>' +
                    '<img class="iw-fav" src="replace-fav" alt="" height="40" width="40">' +
                    '</div>'
                });

                marker.addListener('click', () => {
                    if( prevInfoWindow ) {
                        prevInfoWindow.close();
                    }
                    if(infoWindow.getMap() !== null && typeof infoWindow.getMap() !== "undefined") {
                        infoWindow.close();
                    }
                    else {
                        prevInfoWindow = infoWindow;
                        infoWindow.open(map, marker);
                        this.selectingTruck(schedule, truck);
                    }
                });
                map.addListener('click', function () {
                    infoWindow.close();
                });
                allMarkers.push(marker);
                allWindows.push(infoWindow);

                google.maps.event.addListener(infoWindow, 'domready', function () {
                    $('img[src="replace"]').attr('src', photo);
                    $('img[src="replace-fav"]').attr('src', unfavorite);
                    $('.iw-title').html(name);
                    $('.iw-subTitle').html(category);
                    $('.iw-open-inner').html(open);
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
        if(this.props.selectedSchedule !== null && this.props.selectedSchedule !== undefined) {
            for(var i=0; i< allMarkers.length; i++) {
                if(allMarkers[i].id === this.props.selectedSchedule.id) {
                    console.log(allWindows[i]);
                    if( prevInfoWindow ) {
                        prevInfoWindow.close();
                    }
                    allWindows[i].open(map, allMarkers[i]);
                    prevInfoWindow = allWindows[i];
                }
            }
        }
        return (
            <div id="map"></div>
        );
    }

}