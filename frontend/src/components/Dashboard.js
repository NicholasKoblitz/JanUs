import React, {useState, useEffect, useRef} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Janus } from "../api";
import CourseCard from "./CourseCard";
import '../styles/Dashboard.css'
import Navbar from "./Navbar";


const Dashboard = () => {

    const INIT_STATE = {
        courseId:""    
    }

    const [formData, setFormData] = useState(INIT_STATE);
    let error = useRef();
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
        let res = await Janus.assign({username, courseId}, token)
        if(res.status === 404) {
            error.current = res.message;
        }
        else {
            error.current = null;
        }
        setTrigger(1);
    }


    let errorDiv = error.current ? 
        <div className="error">
            <span>{error.current}</span>
        </div>
        :
        null;

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
        <div className="Dashboard-course">
            {courses.map(course => 
                <Link to={`/courses/${course.courseId}`} key={course.courseId}>
                    <CourseCard 
                        courseId={course.courseId}
                        name={course.name}
                    />
                </Link>
                
            )}
        </div>
        :
        null;

    return (
        <>
            <Navbar/>
            <div className="Dashboard">
            <h1>{username}</h1>
            
            <div className="Dashboard-courses">

                <h2>Courses</h2>

                {isTeacher ? 
            <button onClick={addCourse} className="CreateCourse">Create a new Course</button> 
            : 
            <form onSubmit={handleSubmit} className="AddCourse-form">
                <label htmlFor="courseId">Enter new course ID</label>
                <input 
                    type="text"
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                />
                {errorDiv}
                <button>Add Course</button>
            </form>
            }
            {details}
            </div>
        </div>
        </>
        
    )
}


export default Dashboard;