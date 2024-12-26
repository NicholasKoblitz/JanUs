const supabase = require('../db');
const bcrypt = require('bcrypt');
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require('../config');



class User {

    static async authenticate(username, password) {
        const { data, error } = await supabase
        .from('users')
        .select('first_name', 'last_name', 'username','password', 'is_teacher')
        .eq('username', username)


        const user = data[0];

        if(user) {
            const isValid = await bcrypt.compare(password, user.password);
            if(isValid === true) {
                delete user.password;
                return user;
            }
        }
        throw new UnauthorizedError("Invalid username/password");
    }


    static async register({firstName, lastName, username, password, isTeacher}) {
        const {dataCheck} = await supabase
        .from('users')
        .select('username')
        .eq(username)

        if(dataCheck[0].username) {
            throw new BadRequestError(`Duplicate username: ${username}`)
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const {data} = await supabase
        .from('users')
        .insert(firstName, lastName, username, hashedPassword, isTeacher)
        .select(firstName, lastName, username, hashedPassword, isTeacher)

        const user = data[0];

        return user;
    }


    static async getCoursesByUser(username) {
        const {data, error} = await supabase
        .from('courses')
        .select(
            `
            courseId:course_id,
            name,
            ...user_courses!inner(
              ...users!inner()
            )
            `,
          )
          .eq('users.username', username)

        const courses = data
        
        return courses
    }

    static async assignUser({username, courseId}) {
        const {dataCheck1, errorCheck} = await supabase
        .from('courses')
        .select('course_id')
        .eq('course_id', courseId)

        const course = dataCheck1[0];
        if(!course) throw new NotFoundError(`No course: ${courseId}`)

        const {dataCheck2, errorCheck2} = await supabase
        .from('users')
        .select('id', 'username')
        .eq('username', username)

        const user = dataCheck2[0];
        if (!user) throw new NotFoundError(`No username: ${username}`);
    
        const {data, error} = await supabase
        .from('user_course')
        .insert(courseId, user.id)
        .select()

        return data[0];
    }
}

module.exports = User;