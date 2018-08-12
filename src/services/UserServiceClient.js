
import * as constants from '../constants/constant';

let _singleton = Symbol();

export default class UserServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton module service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new UserServiceClient(_singleton);
        }
        return this[_singleton];
    }

    login(user) {
        return fetch(constants.USER_LOGIN_URL, {
            method: 'put',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(response => {
                if (response.status === 404) {
                    alert("Email or Password is Incorrect");
                    return null;
                }
                else {
                    alert("Successfully Logged In");
                    window.location.reload();
                    return response.json();
                }
            })
    }

    register(user) {
        return fetch(constants.USER_REGISTER_URL, {
            method: 'post',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 409) {
                    alert("User Already Exist");
                    return null;
                }
                else {
                    alert("Sign up successful!\n" +
                        "Now you can sign in to bookmark and access your favorite food trucks.");
                    window.location.reload();
                    return response.json();
                }
            });
    }

    findAccountInfoForUser(userId) {
        return fetch(constants.USER_PROFILE_URL + '/' + userId, {
            credentials: 'include'
        }).then(response => (response.json()));
    }

    logout() {
        return fetch(constants.USER_LOGOUT_URL, {
            method: 'post',
            credentials: 'include'
        });
    }

    findCurrentUser() {
        return fetch(constants.USER_SESSION_URL, {
            method: 'get',
            credentials: 'include'
        })
            .then(response => {
                if (response.status !== 404) {
                    return response.json();
                }
            });
    }

    updateAccountInfoForUser(userId, user) {
        return fetch(constants.USER_PROFILE_URL + '/' + userId, {
            method: 'put',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            if (response.status === 409) {
                alert("Something Went Wrong");
                return null;
            }
            else {
                alert("Password Changed");
                return response.json();
            }
        });
    }

    findAllUsers() {
        return fetch(constants.ALL_USER_URL)
            .then(response => response.json());
    }

    deleteUser(userId) {
        return fetch(constants.ALL_USER_URL + '/' + userId, {
            method: 'delete'
        })
            .then(response => {
                if (response.status === 404) {
                    alert("cannot find user")
                }
            })
    }
}