const axios = require("axios");

const JANUS_URL = "postgresql://postgres.pmbpgyeoydjkhwqgxbay:hqTKe0v2uX32h5gg@aws-0-us-east-1.pooler.supabase.com:6543/postgres";
const COMET_URL = "https://215851690468e749.api-us.cometchat.io/v3/";
const API_KEY = '7a206718ea2245a90d00d043f313ab5192048e02'


export class Janus {

    /**Creates a new student */
    static async registerStudent(data) {
        try {
            const resp = await axios({
                method: 'post',
                url: `${JANUS_URL}api/auth/register/student`,
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
        try {
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
                authorization: `bearer ${token}`
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
    static async createChatGroup(guid, name, courseId) {
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
                apiKey: API_KEY,
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
                apiKey: API_KEY,
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
    static async sendMessage(guid, msg, username) {
        const resp = await axios({
            method: 'post',
            url: `${COMET_URL}messages`,
            headers: {
                apiKey: API_KEY,
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
                apiKey: API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })

        return resp;
    }
}
