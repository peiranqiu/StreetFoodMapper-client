import * as constants from '../constants/constant';

let _singleton = Symbol();

export default class FavoriteServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton module service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new FavoriteServiceClient(_singleton);
        }
        return this[_singleton];
    }


    userLikesTruck(truckId) {
        return fetch(constants.FAVORITE_API_URL + '/' + truckId, {
            method: 'post',
            credentials: 'include'
        })
            .then(response => {
                if (response.status === 403) {
                    alert('please log in!');
                    return false;
                }
                else if (response.status === 404) {
                    alert('an error occurs!');
                    return false;
                }
                else {
                    return true;
                }
            })
    }

    findFavorite(truckId) {
        return fetch(constants.FAVORITE_API_URL + '/' + truckId, {
            method: 'get',
            credentials: 'include'
        })
            .then(response => {
                if (response.status !== 404) {
                    return true;
                }
                return false;
            })
    }

    userUnlikesTruck(truckId) {
        return fetch(constants.FAVORITE_API_URL + '/' + truckId, {
            method: 'delete',
            credentials: 'include'
        })
            .then(response => {
                if (response.status === 403) {
                    alert('please log in!');
                    return false;
                }
                else if (response.status === 404) {
                    alert('an error occurs!');
                    return true;
                }
                else {
                    return false;
                }
            })
    }

    findFavoritesForUser(userId) {
        return fetch(constants.FAVORITE_API_URL + '/user/' + userId)
            .then(response => response.json());
    }

    findFollowersForTruck(truckId) {
        return fetch(constants.FAVORITE_API_URL + '/truck/' + truckId)
            .then(response => response.json());
    }
}