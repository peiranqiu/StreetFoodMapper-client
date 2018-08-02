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


    userLikesSchedule(scheduleId) {
        return fetch(constants.FAVORITE_API_URL + '/' + scheduleId, {
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

    findFavorite(scheduleId) {
        return fetch(constants.FAVORITE_API_URL + '/' + scheduleId, {
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

    userUnlikesSchedule(scheduleId) {
        return fetch(constants.FAVORITE_API_URL + '/' + scheduleId, {
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

    findFollowersForSchedule(scheduleId) {
        return fetch(constants.FAVORITE_API_URL + '/schedule/' + scheduleId)
            .then(response => response.json());
    }
}