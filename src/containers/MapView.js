import React from 'react';
import '../styles/home.css';
import '../styles/map.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import * as constants from '../constants/constant';
import mapIcon from '../resources/icons/map.png'
import mapWhite from '../resources/icons/map-white.png'
import mapRed from '../resources/icons/map-red.png'
import unfavorite from '../resources/icons/unfavorite.png'
import favorite from '../resources/icons/favorite.png'
import $ from 'jquery'
import FavoriteServiceClient from "../services/FavoriteServiceClient";

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
            schedules: [],
            user: {}
        };
        this.favoriteService = FavoriteServiceClient.instance();
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
                var schedules = this.state.schedules;
                schedules.push(schedule);
                this.setState({schedules: schedules});

                var address = " " + schedule.address.substring(0, schedule.address.indexOf(","));
                var open = " Closed";
                if (schedule.open === true) {
                    open = " Open";
                }
                var lat = 42.355;
                var lng = -71.09;
                if (schedule.latitude !== undefined) {
                    lat = Number(schedule.latitude);
                    lng = Number(schedule.longitude);
                }
                var myLatLng = {lat: lat, lng: lng};

                var infoWindow = new google.maps.InfoWindow({
                    position: myLatLng,
                    content: '<div id="iw-container row">' +
                    '<img class="iw-img" src="replace" alt="" height="90" width="90">' +
                    '<a class="iw-title" href=""></a>' +
                    '<div class="iw-subTitle"></div>' +
                    '<div class="iw-open"><i class="fa fa-clock-o"></i><a class="iw-open-inner"></a></div>' +
                    '<div class="iw-address"><i class="fa fa-map-marker"></i><a class="iw-address-inner"></a></div>' +
                    //'<img class="iw-fav" src="replace-fav" alt="" height="40" width="40">' +
                    '</div>'
                });

                infoWindow.addListener('click', () => {
                    this.openWindow(truck.id);
                });
                var href = "/truck/" + truck.id;

                google.maps.event.addListener(infoWindow, 'domready', function () {
                    $('img[src="replace"]').attr('src', photo);
                    //$('img[src="replace-fav"]').attr('src', fav);
                    $('.iw-title').attr('href', href);
                    $('.iw-title').html(name);
                    $('.iw-subTitle').html(category);
                    $('.iw-open-inner').html(open);
                    $('.iw-address-inner').html(address);
                    if (schedule.open === true) {
                        $('.iw-open-inner').addClass('open');
                    }

                    // Reference to the DIV that wraps the bottom of infowindow
                    var iwOuter = $('.gm-style-iw');
                    var iwBackground = iwOuter.prev();

                    // Removes background shadow DIV
                    iwBackground.children(':nth-child(2)').css({'display': 'none'});

                    // Removes white background DIV
                    iwBackground.children(':nth-child(4)').css({'display': 'none'});
                    var iwCloseBtn = iwOuter.next();
                    iwCloseBtn.css({display: 'none'});
                    iwBackground.children(':nth-child(3)').attr('style', function (i, s) {
                        return s + 'display: none !important;'
                    });
                    $("div:eq(0)", iwBackground).hide();
                });

                var isFav = false;
                var icon = mapIcon;
                this.favoriteService.findFavorite(schedule.id)
                    .then((response) => {
                        if (response) {
                            isFav = true;
                            icon = mapRed;
                        }
                        var marker = new google.maps.Marker({
                            position: myLatLng,
                            map: map,
                            icon: icon
                        });
                        marker.id = schedule.id;
                        marker.isFav = isFav;

                        marker.addListener('click', () => {
                            if (prevInfoWindow) {
                                prevInfoWindow.close();
                            }
                            if (infoWindow.getMap() !== null && typeof infoWindow.getMap() !== "undefined") {
                                if (marker.isFav) {
                                    marker.setIcon(mapRed);
                                }
                                else {
                                    marker.setIcon(mapIcon);
                                }
                                infoWindow.close();
                            }
                            else {
                                marker.setIcon(mapWhite);
                                prevInfoWindow = infoWindow;
                                infoWindow.open(map, marker);
                                this.selectingTruck(schedule, truck);
                            }
                        });
                        map.addListener('click', function () {
                            if (marker.isFav) {
                                marker.setIcon(mapRed);
                            }
                            else {
                                marker.setIcon(mapIcon);
                            }
                            infoWindow.close();
                        });
                        allMarkers.push(marker);
                        allWindows.push(infoWindow);

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
        let openFilter = $('#btn-open').hasClass('active');
        let laterFilter = $('#btn-later').hasClass('active');
        let favoriteFilter = $('#btn-favorite').hasClass('active');
        let searching = $('#search-icon').hasClass('fa-times');

        if (this.state.trucks !== [] && this.state.schedules !== []) {
            for (var i = 0; i < allMarkers.length; i++) {
                allMarkers[i].setVisible(true);
            }
            this.state.trucks.map((truck) => {
                if (searching
                    && !(truck.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                            .includes(this.props.search.toLowerCase())
                        || truck.category1.toString().toLowerCase() === (this.props.search.toLowerCase())
                        || truck.category2.toString().toLowerCase() === (this.props.search.toLowerCase())
                        || truck.category3.toString().toLowerCase() === (this.props.search.toLowerCase()))) {
                    truck.schedules.map((schedule) => {
                        for (var i = 0; i < allMarkers.length; i++) {
                            if (allMarkers[i].id === schedule.id) {
                                allMarkers[i].setVisible(false);
                                break;
                            }
                        }
                    });
                    return null;
                }
                truck.schedules.map((schedule) => {
                    if ((openFilter && !schedule.open) || (laterFilter && schedule.open)) {
                        for (var i = 0; i < allMarkers.length; i++) {
                            if (allMarkers[i].id === schedule.id) {
                                allMarkers[i].setVisible(false);
                                break;
                            }
                        }
                    }
                    if (favoriteFilter) {
                        var isFav = false;
                        this.props.favorites.map((favorite) => {
                            if (schedule.id === favorite.id) {
                                isFav = true;
                            }
                        });
                        if (isFav === false) {
                            for (var i = 0; i < allMarkers.length; i++) {
                                if (allMarkers[i].id === schedule.id) {
                                    allMarkers[i].setVisible(false);
                                    break;
                                }
                            }
                        }
                    }
                })
            })
        }
        if (this.props.selectedSchedule !== null && this.props.selectedSchedule !== undefined) {
            for (var i = 0; i < allMarkers.length; i++) {
                if (allMarkers[i].id === this.props.selectedSchedule.id) {
                    if (prevInfoWindow) {
                        prevInfoWindow.close();
                    }
                    allWindows[i].open(map, allMarkers[i]);
                    allMarkers[i].setIcon(mapWhite);
                    prevInfoWindow = allWindows[i];
                }
                else if (allMarkers[i].isFav) {
                    allMarkers[i].setIcon(mapRed);
                }
                else {
                    allMarkers[i].setIcon(mapIcon);
                }
            }
        }
        return (
            <div id="map"></div>
        );
    }

}