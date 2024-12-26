const supabase = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");


class Course {

    static async getAll() {
        const {data, error} = await supabase
        .from('courses')
        .select('courseId:course_id', 'name')

        const courses = data;

        return courses;
    }

    static async getSingleCourse(courseId) {
        const {data, error} = await supabase
        .from('courses')
        .select('courseId:course_id', 'name')
        .eq('course_id', courseId)

        const course = data[0];

        if(!course) throw new NotFoundError(`Course not found: ${courseId}`)

        return course;
    }

    static async createCourse({courseId, name}) {
        const {data, error} = await supabase
        .from('courses')
        .insert(courseId, name)
        .select(courseId, name)

        const course = data[0];

        return course;
    }


    static async getUsersByCourse(courseId) {
        const { data, error } = await supabase
        .from('users')
        .select(`
            firstName:first_name,
            lastName:last_name,
            ...user_courses!inner(
                ...courses!inner(
                    course_id
                    )
                )
            `,
        )
        .eq('user_courses.course_id', 'd')


        const users = data;

        if(!users) throw new NotFoundError(`No users assigned to ${courseId}`)

        return users;
    }

    static async deleteCourse(courseId) {
        const res = await db.query(
            `DELETE 
            FROM courses
            WHERE course_id = $1
            RETURNING course_id AS "courseId"`,
            [courseId]
        );

        const {data, error} = await supabase
        .from('courses')
        .delete()
        .eq('course_id', courseId)
        .select()

        const course = data[0];

        if(!course) throw new NotFoundError(`Course not found: ${courseId}`)
    }
}

module.exports = Course;