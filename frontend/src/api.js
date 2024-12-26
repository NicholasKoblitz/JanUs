const axios = require("axios");

const JANUS_URL = "https://pmbpgyeoydjkhwqgxbay.supabase.co/";
const JANUS_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtYnBneWVveWRqa2h3cWd4YmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwMTU2NjcsImV4cCI6MjA0ODU5MTY2N30.VFtcf68tvTJ96EnVhzhSFty3OOwUb0oyOPtVkwTg6VM"
const COMET_URL = "https://215851690468e749.api-us.cometchat.io/v3/";
const API_KEY = '7a206718ea2245a90d00d043f313ab5192048e02'


export class Janus {

    /**Creates a new student */
    static async registerStudent(data) {
        try {
            const resp = await axios({
                method: 'post',
                url: `${JANUS_URL}api/auth/register/student`,
                headers: {
                    apikey: JANUS_KEY,
                    "Access-Control-Allow-Origin": "https://janus-project.netlify.app/"

                },
                data: data
            });
    
            return resp.data.token;
        }
        catch(err) {
            let error = err.response.data.error
            return error
        }
        
    }

     /**Creates a new teacher */
     static async registerTeacher(data) {
        try {
            const resp = await axios({
                method: 'post',
                url: `${JANUS_URL}api/auth/register/teacher`,
                headers: {
                    apikey: JANUS_KEY,
                    "Access-Control-Allow-Origin": "https://janus-project.netlify.app/"
                },
                data: data
            });
    
            return resp.data.token;
        }
        catch(err) {
            let error = err.response.data.error
            return error
        }
        
    }

    /**Authenticate a user */
    static async login(data) {
        try {
            const resp = await axios({
                method: "post",
                url: `${JANUS_URL}api/auth/login`,
                headers: {
                    apikey: JANUS_KEY,
                    "Access-Control-Allow-Origin": "https://janus-project.netlify.app/"
                },
                data: data
            });
    
            let token = resp.data.token;
            let isTeacher = resp.data.isTeacher;
            let firstName = resp.data.firstName;
    
            return {token, isTeacher, firstName}
        }
        catch(err) {
            let error = err.response.data.error;
            return error;
        }

       ;
    }

    /**Returns JSON on all courses */
    static async getAllCourses(token) {
        const resp = await axios({
            method: "get",
            url: `${JANUS_URL}api/courses`,
            headers: {
                apikey: JANUS_KEY,
                authorization: `bearer ${token}`,
                "Access-Control-Allow-Origin": "https://janus-project.netlify.app/"
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
                apikey: JANUS_KEY,
                authorization: `bearer ${token}`,
                "Access-Control-Allow-Origin": "https://janus-project.netlify.app/"
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
                apikey: JANUS_KEY,
                authorization: `bearer ${token}`,
                "Access-Control-Allow-Origin": "https://janus-project.netlify.app/"
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
                apikey: JANUS_KEY,
                authorization: `bearer ${token}`,
                "Access-Control-Allow-Origin": "https://janus-project.netlify.app/"
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
                apikey: JANUS_KEY,
                authorization: `bearer ${token}`,
                "Access-Control-Allow-Origin": "https://janus-project.netlify.app/"
            }
        })

        return resp.data.courses;
    }

    /**Assign a student to a course */
    static async assign(data, token) {
        try {
            const resp = await axios({
                method: "post",
                url: `${JANUS_URL}api/users/assign`,
                headers: {
                    apikey: JANUS_KEY,
                    authorization: `bearer ${token}`,
                    "Access-Control-Allow-Origin": "https://janus-project.netlify.app/"
                },
                data: data
            });
    
            return resp.data.assignedUser;
        }
        catch(err) {
            return err.response.data.error;
        }
        
    }

    /**Deletes the requested course */
    static async deleteCourse(course_id, token) {
        const resp = await axios({
            method: 'delete',
            url: `${JANUS_URL}api/courses/${course_id}/remove`,
            headers: {
                apikey: JANUS_KEY,
                authorization: `bearer ${token}`,
                "Access-Control-Allow-Origin": "https://janus-project.netlify.app/"
            }
        })

        return resp.data.msg;
    }

}


export class Comet {

    /**Creates a user for the chat app */
    static async createChatUser(uid, name) {
        const resp = await axios({
            method: "post",
            url: `${COMET_URL}users`,
            headers: {
                apikey: API_KEY,
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
                apikey: API_KEY,
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
                apikey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        
        return resp;
    }


    /**Create a chat group */
    static async createChatGroup(guid, name, courseId) {
        const resp = await axios({
            method: 'post',
            url: `${COMET_URL}groups`,
            headers: {
                apikey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: {
                type: "private",
                name: name,
                guid: guid,
                tags: [courseId]
            }
        })

        return resp
    }

    static async getChatGroup(guid) {
        const resp = await axios({
            method: "get",
            url: `${COMET_URL}groups/${guid}`,
            headers: {
                apikey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        
        return resp;
    }

    /**Get all groups by course */
    static async getGroupsByCourse(courseId) {
        const resp = await axios({
            method: "get",
            url: `${COMET_URL}groups?withTags=true&tags=${courseId}`,
            headers: {
                apikey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
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
                apikey: API_KEY,
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
                apikey: API_KEY,
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
                apikey: API_KEY,
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
                apikey: API_KEY,
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
    static async sendMessage(guid, msg, username) {
        const resp = await axios({
            method: 'post',
            url: `${COMET_URL}messages`,
            headers: {
                apikey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json',
                onBehalfOf: username
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
                apikey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })

        return resp;
    }
}
