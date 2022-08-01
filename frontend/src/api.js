const axios = require("axios");

const JANUS_URL = "https://janusapi.herokuapp.com/" || "http://localhost:5000/";
const COMET_URL = "https://21379818571f3395.api-us.cometchat.io/v3/";
const API_KEY = 'ea96b6ec6390d2635fa38d7ff9143e9628970b7b'


class Janus {

    /**Creates a new student */
    static async registerStudent(data) {
        const resp = await axios({
            method: 'post',
            url: `${JANUS_URL}api/auth/register/student`,
            data: data
        });

        return resp.data.token;
    }

     /**Creates a new teacher */
     static async registerTeacher(data) {
        const resp = await axios({
            method: 'post',
            url: `${JANUS_URL}api/auth/register/teacher`,
            data: data
        });

        return resp.data.token;
    }

    /**Authenticate a user */
    static async login(data) {
        const resp = await axios({
            method: "post",
            url: `${JANUS_URL}api/auth/login`,
            data: data
        });

        let token = resp.data.token;
        let isTeacher = resp.data.isTeacher

        return {token, isTeacher};
    }

    /**Returns JSON on all courses */
    static async getAllCourses(token) {
        const resp = await axios({
            method: "get",
            url: `${JANUS_URL}api/courses`,
            headers: {
                authorization: `bearer ${token}`
            }
        });

        return resp.data.courses;
    }

    /**Returns JSON of a single course */
    static async getSingleCourse(courseId, token) {
        const resp = await axios({
            method: "get",
            url: `${JANUS_URL}api/courses/${courseId}`,
            headers: {
                authorization: `bearer ${token}`
            }
        })

        return resp.data.course;
    }

    /**Create a new course */
    static async createCourse(data, token) {
        const resp = await axios({
            method: "post",
            url: `${JANUS_URL}api/courses`,
            headers: {
                authorization: `bearer ${token}`
            },
            data: data

        })

        return resp.data.course;
    }

    /**Gets JSON for all the students based on the course */
    static async getAllStudentsByCourse(course_id, token) {
        const resp = await axios({
            method: "get",
            url: `${JANUS_URL}api/courses/${course_id}/users`,
            headers: {
                authorization: `bearer ${token}`
            }
        })

        return resp.data.users;
    }

    /**Gets JSON for all the courses based on the student*/
    static async getAllCoursesByStudent(username, token) {
        const resp = await axios({
            method: "get",
            url: `${JANUS_URL}api/users/${username}/courses`,
            headers: {
                authorization: `bearer ${token}`
            }
        })

        return resp.data.courses;
    }

    /**Assign a student to a course */
    static async assign(data, token) {
        const resp = await axios({
            method: "post",
            url: `${JANUS_URL}api/users/assign`,
            headers: {
                authorization: `bearer ${token}`
            },
            data: data
        });

        return resp.data.assignedUser;
    }

    /**Deletes the requested course */
    static async deleteCourse(course_id, token) {
        const resp = await axios({
            method: 'delete',
            url: `${JANUS_URL}api/courses/${course_id}/remove`,
            headers: {
                authorization: `bearer ${token}`
            }
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

    static async getChatGroup(guid) {
        const resp = await axios({
            method: "get",
            url: `${COMET_URL}groups/${guid}`,
            headers: {
                apiKey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        
        return resp;
    }

    /**Get all groups by course */
    static async getGroupsByCourse(guid) {
        const resp = await axios({
            method: "get",
            url: `${COMET_URL}groups?searchKey=${guid}`,
            headers: {
                apiKey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })
        
        return resp;
    }

    /**Get group by student */
    static async getGroupByStudent(username) {
        const resp = await axios({
            method: "get",
            url: `${COMET_URL}groups?hasJoined=true`,
            headers: {
                apiKey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json',
                onBehalfOf: username
            }
        })
        
        return resp;
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

    /**Get Members of a group */
    static async getGroupMembers(guid) {
        const resp = await axios({
            method: "get",
            url: `${COMET_URL}groups/${guid}/members`,
            headers: {
                apiKey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
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