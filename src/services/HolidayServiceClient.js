import * as constants from '../constants/constant';

let _singleton = Symbol();

export default class HolidayServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton module service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new HolidayServiceClient(_singleton);
        }
        return this[_singleton];
    }

    createHoliday(truckId, holiday) {
        return fetch(constants.ALL_TRUCK_URL + '/' + truckId + '/holiday', {
            method: 'post',
            body: JSON.stringify(holiday),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            return response.json()
        });
    }

    deleteHoliday(holidayId) {
        return fetch(constants.ALL_HOLIDAY_URL + '/' + holidayId, {
            method: 'delete'
        })
            .then(response => {
                if (response.status === 404) {
                    alert("cannot find")
                    return false;
                }
                return true;
            })
    }

    findHolidayById(holidayId) {
        return fetch(constants.ALL_HOLIDAY_URL + '/' + holidayId)
            .then(response => {
                if (response.status === 404) {
                    return null;
                }
                else {
                    return response.json();
                }
            });
    }

    findHolidaysForTruck(truckId) {
        return fetch(constants.ALL_TRUCK_URL + '/' + truckId + '/holiday')
            .then(response => response.json());
    }

    updateHoliday(truckId, holidayId, holiday) {
        return fetch(constants.ALL_TRUCK_URL + '/' + truckId + '/holiday/' + holidayId, {
            method: 'put',
            body: JSON.stringify(holiday),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());
    }
}