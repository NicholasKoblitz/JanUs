import React, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Janus } from "../api";
import CourseCard from "./CourseCard";


const Dashboard = () => {

    const INIT_STATE = {
        courseId:""    
    }

    const [formData, setFormData] = useState(INIT_STATE);
    const navigate = useNavigate();
    const [courses, setCourses] = useState();
    const [trigger, setTrigger] = useState();
    let isTeacher = localStorage.getItem("isTeacher") 
    let token = localStorage.getItem("token")
    let username = localStorage.getItem("currentUser")
    

    useEffect(() =>{
        async function fetchCourses() {
            if(!localStorage.getItem('currentUser')) {
                navigate('/')
            }
            let res = await Janus.getAllCoursesByStudent(username, token);
            
            if(res === []) {
                setCourses(null);
            }
            else {
                setCourses(res);
            }
            setTrigger(0)
        }
        fetchCourses();
    }, [trigger])

    const assignToCourse = async () => {
        let courseId = formData.courseId;
        await Janus.assign({username, courseId}, token)
        setTrigger(1);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await assignToCourse();
        setFormData(INIT_STATE);
    }


    const addCourse = () => {
        navigate('/courses/create-course')
    }

    let details = courses ? 
        <>
            {courses.map(course => 

                // !isTeacher ? 
                // <Link to={`/groups/${course.courseId}/chat`} key={course.courseId}>
                //     <CourseCard 
                //         courseId={course.courseId}
                //         name={course.name}
                //     />
                // </Link>               
                // :
                <Link to={`/courses/${course.courseId}`} key={course.courseId}>
                    <CourseCard 
                        courseId={course.courseId}
                        name={course.name}
                    />
                </Link>
                
            )}
        </>
        :
        null;

    return (
        <div className="StudentCourses">
            <h1>Welcome</h1>
            {isTeacher ? 
            <button onClick={addCourse}>Create a new Course</button> 
            : 
            <form onSubmit={handleSubmit}>
                <label htmlFor="courseId">Enter new course ID</label>
                <input 
                    type="text"
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                />
                <button>Add Course</button>
            </form>
            }
            {details}
        </div>
    )
}


export default Dashboard;