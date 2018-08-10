import * as constants from '../constants/constant';

let _singleton = Symbol();

export default class PhotoServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton module service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new PhotoServiceClient(_singleton);
        }
        return this[_singleton];
    }

    createPhoto(truckId, photo) {
        return fetch(constants.ALL_TRUCK_URL + '/' + truckId + '/photo', {
            method: 'post',
            body: JSON.stringify(photo),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            return response.json()
        });
    }

    deletePhoto(photoId) {
        return fetch(constants.ALL_PHOTO_URL + '/' + photoId, {
            method: 'delete'
        })
            .then(response => {
                if (response.status === 404) {
                    alert("cannot find");
                    return false;
                }
                return true;
            })
    }

    findPhotoById(photoId) {
        return fetch(constants.ALL_PHOTO_URL + '/' + photoId)
            .then(response => {
                if (response.status === 404) {
                    return null;
                }
                else {
                    return response.json();
                }
            });
    }

    findPhotosForTruck(truckId) {
        return fetch(constants.ALL_TRUCK_URL + '/' + truckId + '/photo')
            .then(response => response.json());
    }

}