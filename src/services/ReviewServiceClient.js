import * as constants from '../constants/constant';

let _singleton = Symbol();

export default class ReviewServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton module service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new ReviewServiceClient(_singleton);
        }
        return this[_singleton];
    }

    findReviewById(reviewId) {
        return fetch(constants.ALL_REVIEW_URL + '/' + reviewId)
            .then(response => {
                if (response.status === 404) {
                    return null;
                }
                else {
                    return response.json();
                }
            });
    }

    findAllReviews() {
        return fetch(constants.ALL_REVIEW_URL)
            .then(response => response.json());
    }

    findReviewsForTruck(truckId) {
        return fetch(constants.ALL_TRUCK_URL + '/' + truckId + '/review')
            .then(response => response.json());
    }
}