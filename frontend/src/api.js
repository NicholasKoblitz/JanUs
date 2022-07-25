const axios = require("axios");

const JANUS_URL = "https://janusapi.herokuapp.com" || "http://localhost:5000";
const COMET_URL = "https://21379818571f3395.api-us.cometchat.io/v3";


class Janus {

    /**Creates a new user */
    static async register(data) {
        let resp = await axios({
            method: 'post',
            url: `${JANUS_URL}api/register`,
            data: data
        })

        return resp.data.user
    }

    /**Authenticate a user */
    static async login(data) {
        let resp = await axios({
            method: "post",
            url: `${JANUS_URL}api/login`,
            data: data
        })

        return resp.data.user
    }


    static async getAllCourses() {
        
    }

}


class Comet {

}


exports = {
    Janus,
    Comet
}