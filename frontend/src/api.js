const axios = require("axios");

const JANUS_URL = "https://janusapi.herokuapp.com" || "http://localhost:5000";
const COMET_URL = "https://21379818571f3395.api-us.cometchat.io/v3";


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

}


exports = {
    Janus,
    Comet
}