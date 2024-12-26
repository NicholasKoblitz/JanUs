import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {Janus} from '../api'
import '../styles/AddCourseForm.css'
import Navbar from "./Navbar";

const AddCourseForm = () => {

    

    const INIT_STATE = {
        courseId: "",
        name: ""
    }

    const [formData, setFormData] = useState(INIT_STATE);
    const navigate = useNavigate();

    if(!localStorage.getItem("isTeacher")) navigate("/")

    const addCourse = async () => {
        let token = localStorage.getItem("token");
        let username = localStorage.getItem("currentUser");
        let res = await Janus.createCourse(formData, token);
        let courseId = res.courseId;
        await Janus.assign({username, courseId}, token)
        
        navigate(`/users/${username}`)
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
        await addCourse();
        setFormData(INIT_STATE);
    }

    return (
        <>
        <Navbar/>
            <div className="AddCourseForm">
            <form className="AddCourseForm-form" onSubmit={handleSubmit}>
                <label htmlFor="courseId" id="id">Course ID</label>
                <input
                    type="text"
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                />
                <label htmlFor="name">Course Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <button>Add</button>
            </form>
        </div>
        </>
        
    )
}

export default AddCourseForm;