import * as constants from '../constants/constant';

let _singleton = Symbol();

export default class ScheduleServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton module service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new ScheduleServiceClient(_singleton);
        }
        return this[_singleton];
    }

    createSchedule(truckId, schedule) {
        return fetch(constants.ALL_TRUCK_URL + '/' + truckId + '/schedule', {
            method: 'post',
            body: JSON.stringify(schedule),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            return response.json()
        });
    }

    findScheduleById(scheduleId) {
        return fetch(constants.ALL_SCHEDULE_URL + '/' + scheduleId)
            .then(response => {
                if (response.status === 404) {
                    return null;
                }
                else {
                    return response.json();
                }
            });
    }

    updateSchedule(truckId, scheduleId, schedule) {
        return fetch(constants.ALL_TRUCK_URL + '/' + truckId + '/schedule/' + scheduleId, {
            method: 'put',
            body: JSON.stringify(schedule),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());
    }

    findAllSchedules() {
        return fetch(constants.ALL_SCHEDULE_URL)
            .then(response => response.json());
    }

    findSchedulesForTruck(truckId) {
        return fetch(constants.ALL_TRUCK_URL + '/' + truckId + '/schedule')
            .then(response => response.json());
    }

    deleteSchedule(scheduleId) {
        return fetch(constants.ALL_SCHEDULE_URL + '/' + scheduleId, {
            method: 'delete'
        })
            .then(response => {
                if (response.status === 404) {
                    alert("cannot find user")
                }
            })
    }
}