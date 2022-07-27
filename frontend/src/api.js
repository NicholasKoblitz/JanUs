const axios = require("axios");

const JANUS_URL = "https://janusapi.herokuapp.com/" || "http://localhost:5000/";
const COMET_URL = "https://21379818571f3395.api-us.cometchat.io/v3/";
const API_KEY = 'ea96b6ec6390d2635fa38d7ff9143e9628970b7b'


class Janus {

    /**Creates a new user */
    static async register(data) {
        const resp = await axios({
            method: 'post',
            url: `${JANUS_URL}api/register`,
            data: data
        });

        return resp.data.user;
    }

    /**Authenticate a user */
    static async login(data) {
        const resp = await axios({
            method: "post",
            url: `${JANUS_URL}api/login`,
            data: data
        });

        return resp.data.user;
    }

    /**Returns JSON on all courses */
    static async getAllCourses() {
        const resp = await axios({
            method: "get",
            url: `${JANUS_URL}api/courses`
        });

        return resp.data.courses;
    }

    /**Returns JSON of a single course */
    static async getSingleCourse(course_id) {
        const resp = await axios({
            method: "get",
            url: `${JANUS_URL}api/courses/${course_id}`,
        })

        return resp.data.course;
    }

    /**Create a new course */
    static async createCourse(data) {
        const resp = await axios({
            method: "post",
            url: `${JANUS_URL}api/courses`,
            data: data
        })

        return resp.data.course;
    }

    /**Gets JSON for all the students based on the course */
    static async getAllStudentsByCourse(course_id) {
        const resp = await axios({
            method: "get",
            url: `${JANUS_URL}api/courses/${course_id}/users`
        })

        return resp.data.users;
    }

    /**Gets JSON for all the courses based on the student*/
    static async getAllCoursesByStudent(user_id) {
        const resp = await axios({
            method: "get",
            url: `${JANUS_URL}api/users/${user_id}/courses`
        })

        return resp.data.courses;
    }

    /**Deletes the requested course */
    static async deleteCourse(course_id) {
        const resp = await axios({
            method: 'delete',
            url: `${JANUS_URL}api/courses/${course_id}/remove`
        })

        return resp.data.msg;
    }

}


class Comet {

    /**Creates a user for the chat app */
    static async createChatUser(uid, name) {
        const resp = await axios({
            method: "post",
            url: `${COMET_URL}users`,
            headers: {
                apiKey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: {
                uid: uid,
                name: name
            }
        })

        return resp;
    }

    /**Get a single chat user */
    static async getChatUser(uid) {
        const resp = await axios({
            method: "get",
            url: `${COMET_URL}users/${uid}`,
            headers: {
                apiKey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        
        return resp;
    }


    /**Delete a chat user */
    static async deleteChatUser(uid) {
        const resp = await axios({
            method: "delete",
            url: `${COMET_URL}users/${uid}`,
            headers: {
                apiKey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        
        return resp;
    }


    /**Create a chat group */
    static async createChatGroup(guid, name) {
        const resp = await axios({
            method: 'post',
            url: `${COMET_URL}groups`,
            headers: {
                apiKey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: {
                type: "private",
                name: name,
                guid: guid,
            }
        })

        return resp
    }

    /**Delete a chat group */
    static async deleteChatGroup(guid) {
        const resp = await  axios({
            method: "delete",
            url: `${COMET_URL}groups/${guid}`,
            headers: {
                apiKey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },

        })
        return resp;
    }

    /**Add a member to a group */
    static async addMemberToChatGroup(guid, memberuid) {
        const resp = await axios({
            method: 'post',
            url: `${COMET_URL}groups/${guid}/members`,
            headers: {
                apiKey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: {
                participants: [memberuid]
            }
        })

        return resp;
    }

    /**Send a message to the group */
    static async sendMessage(guid, msg) {
        const resp = await axios({
            method: 'post',
            url: `${COMET_URL}messages`,
            headers: {
                apiKey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: {
                category: 'message',
                type: "text",
                data: {
                    text: msg
                },
                receiver: guid,
                receiverType: "group",
            }
        })

        return resp;
    }

    /**Gets a groups messages for the user */
    static async getGroupMessages(guid) {
        const resp = await axios({
            method: 'get',
            url: `${COMET_URL}groups/${guid}/messages`,
            headers: {
                apiKey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })

        return resp;
    }
}


module.exports = {
    Janus,
    Comet
}