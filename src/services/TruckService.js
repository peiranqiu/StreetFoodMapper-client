let _singleton = Symbol();
const TRUCK_API_URL =
    'http://localhost:8080/api/truck/TID';
const USER_TRUCK_API_URL =
    'http://localhost:8080/api/user/UID/truck';
const ALL_TRUCK_API_URL =
    'http://localhost:8080/api/truck';

export default class TruckService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TruckService(_singleton);
        return this[_singleton]
    }

    createTruck(userId, truck) {
        return fetch(USER_TRUCK_API_URL.replace('UID', userId),
            {
                body: JSON.stringify(truck),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteTruck(truckId) {
        return fetch(TRUCK_API_URL.replace
        ('TID', truckId), {
            method: 'delete'
        })
    }

    findAllTrucksForUser(userId) {
        return fetch(
            USER_TRUCK_API_URL
                .replace('UID', userId))
            .then(function (response) {
                return response.json();
            })
    }

    findAllTrucks() {
        return fetch(ALL_TRUCK_API_URL)
            .then(function (response) {
                return response.json();
            });
    }

    findTruckById(truckId) {
        return fetch(TRUCK_API_URL.replace
        ('TID', truckId))
            .then(function(response) {
                return response.json();
            });
    }

    updateTruck(truckId, truck) {
        return fetch(TRUCK_API_URL.replace
            ('TID', truckId),
            {
                method : 'PUT',
                body : JSON.stringify(truck),
                headers: {
                    'content-type':'application/json'
                }})
            .then(function(response) {
                var contentType = response.headers.get("content-type");
                if(contentType && contentType.includes("application/json")) {
                    return response.json();
                }
                else {
                    return null;
                }
            });
    }
}