//export const SERVER = 'http://localhost:8080/api'
export const SERVER = 'https://projectserver-peiran.herokuapp.com/api'

export const GOOGLE_MAP_KEY = 'AIzaSyD8Gpn93BQCNz2U-hi_6XYGY8gAbcHkSaU';

export const ALL_USER_URL = SERVER + '/user';
export const ALL_OWNER_URL = SERVER + '/owner';
export const USER_REGISTER_URL = SERVER + '/register/user';
export const OWNER_REGISTER_URL = SERVER + '/register/owner';
export const USER_LOGIN_URL = SERVER + '/login/user';
export const OWNER_LOGIN_URL = SERVER + '/login/owner';
export const USER_LOGOUT_URL = SERVER + '/logout/user';
export const OWNER_LOGOUT_URL = SERVER + '/logout/owner';
export const USER_PROFILE_URL = SERVER + '/profile/user';
export const OWNER_PROFILE_URL = SERVER + '/profile/owner';
export const USER_SESSION_URL = SERVER + '/session/user';
export const OWNER_SESSION_URL = SERVER + '/session/owner';

export const ALL_TRUCK_URL = SERVER + '/truck';
export const ALL_SCHEDULE_URL = SERVER + '/schedule';
export const ALL_OPENTIME_URL = SERVER + '/openTime';
export const ALL_REVIEW_URL = SERVER + '/review';
export const ALL_PHOTO_URL = SERVER + '/photo';
export const ALL_HOLIDAY_URL = SERVER + '/holiday';
export const FAVORITE_API_URL = SERVER + '/favorite';
export const CATEGORIES = [
    'AMERICAN', 'ASIAN', 'BREAKFAST', 'BURGERS', 'CHEESE', 'CHINESE', 'COFFEE', 'DRINKS', 'HALAL', 'ICECREAM',
    'INDIAN', 'JAPANESE', 'KOREAN', 'PIZZA', 'SALADS', 'SANDWICHES', 'SUSHI', 'VEGETARIAN', 'TACOS', 'VIETNAMESE'
];

export const MAP_STYLE = [
    {
        "featureType": "administrative.neighborhood",
        "stylers": [
            {
                "weight": 2
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "lightness": 45
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "weight": 1
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "lightness": 40
            },
            {
                "visibility": "simplified"
            }
        ]
    }
];