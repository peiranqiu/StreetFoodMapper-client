import * as constants from '../constants/constant';

let _singleton = Symbol();

export default class TruckServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton module service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new TruckServiceClient(_singleton);
        }
        return this[_singleton];
    }

    createTruck(ownerId, truck) {
        return fetch(constants.ALL_OWNER_URL + '/' + ownerId + '/truck', {
            method: 'post',
            body: JSON.stringify(truck),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            return response.json()
        });
    }

    findTruckById(truckId) {
        return fetch(constants.ALL_TRUCK_URL + '/' + truckId)
            .then(response => {
                if (response.status === 404) {
                    return null;
                }
                else {
                    return response.json();
                }
            });
    }

    updateTruck(truckId, truck) {
        return fetch(constants.ALL_TRUCK_URL + '/' + truckId, {
            method: 'put',
            body: JSON.stringify(truck),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            if (response.status === 500) {
                //alert("cannot update truck")
            }
            return response.json()
        });
    }


    findAllTrucks() {
        return fetch(constants.ALL_TRUCK_URL)
            .then(response => response.json());
    }

    findTrucksForOwner(ownerId) {
        return fetch(constants.ALL_OWNER_URL + '/' + ownerId + '/truck')
            .then(response => response.json());
    }

    deleteTruck(truckId) {
        return fetch(constants.ALL_TRUCK_URL + '/' + truckId, {
            method: 'delete'
        })
            .then(response => {
                if (response.status === 404) {
                    alert("cannot find truck")
                }
            })
    }
}