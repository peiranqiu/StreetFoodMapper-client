import * as constants from '../constants/constant';

let _singleton = Symbol();

export default class OpenTimeServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton module service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new OpenTimeServiceClient(_singleton);
        }
        return this[_singleton];
    }

    createOpenTime(scheduleId, openTime) {
        return fetch(constants.ALL_SCHEDULE_URL + '/' + scheduleId + '/openTime', {
            method: 'post',
            body: JSON.stringify(openTime),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            return response.json()
        });
    }

    findOpenTimeById(openTimeId) {
        return fetch(constants.ALL_OPENTIME_URL + '/' + openTimeId)
            .then(response => {
                if (response.status === 404) {
                    return null;
                }
                else {
                    return response.json();
                }
            });
    }

    updateOpenTime(truckId, scheduleId, openTimeId, openTime) {
        return fetch(constants.ALL_TRUCK_URL + '/' + truckId + '/schedule/' + scheduleId + '/openTime/' + openTimeId, {
            method: 'put',
            body: JSON.stringify(openTime),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());
    }

    findOpenTimesForSchedule(truckId, scheduleId) {
        return fetch(constants.ALL_TRUCK_URL + '/' + truckId + '/schedule/' + scheduleId + '/openTime')
            .then(response => response.json());
    }

    deleteOpenTime(openTimeId) {
        return fetch(constants.ALL_OPENTIME_URL + '/' + openTimeId, {
            method: 'delete'
        })
            .then(response => {
                if (response.status === 404) {
                    alert("cannot find user")
                }
            })
    }
}