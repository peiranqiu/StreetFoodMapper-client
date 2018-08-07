import * as constants from '../constants/constant';

let _singleton = Symbol();

export default class YelpServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton module service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new YelpServiceClient(_singleton);
        }
        return this[_singleton];
    }

    findTruckByPhone(phone) {
        return fetch(constants.SERVER + '/yelp/truck/phone/'+phone)
            .then(response => {
                if (response.status === 500) {
                    alert("Cannot find truck with this phone number.")
                    return false;
                } else {
                    return response.json();
                }
            })
    }
}