import Config from "../common/Config"
import axios from 'axios'

var _instance = axios.create({
    baseURL: Config.BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// var _local = $.localStorage

var APIInstance = {
    shared() {
        return _instance;
    },

    setJSONRequest() {
        // set request mode by json
        _instance.defaults.headers.post['Content-Type'] = 'application/json';
    },

    setFormRequest() {
        // set request mode by form
        _instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    },

    // setToken(t) {
    //     /// set request token
    //     localStorage.token = t;
    //     _instance = axios.create({
    //         baseURL: Config.BACKEND_API_URL,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': "Bearer " + localStorage.token
    //         }
    //     });
    // },

    // getToken() {
    //     return localStorage.token
    // },

    // loggedIn() {
    //     //if (localStorage.token == undefined)
    //     //    return false

    //     //return !!localStorage.token
	// return true;
    // },

    // logout(cb) {
    //     delete localStorage.token
    //     // remove business
    //     _local.remove("business");
    // },

}

export default APIInstance
