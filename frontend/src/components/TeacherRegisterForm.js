import React, {useContext, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import {Janus} from '../api';
import UserContext from "./UserContext";
import '../styles/RegisterForm.css'
import Navbar from "./Navbar";




const TeacherRegisterForm = () => {

    const INIT_STATE = {
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(INIT_STATE);
    let error = useRef();
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const registerTeacher = async () => {
        let janusRes = await Janus.registerTeacher(formData);
        if(janusRes.status === 400) {
            error.current = janusRes.message;
        }
        else {
            error.current = null
            setUser(formData.username)
            localStorage.setItem("token", janusRes)
            localStorage.setItem("currentUser", formData.username)
            localStorage.setItem("isTeacher", true);
            localStorage.setItem('uid', formData.firstName);
            navigate(`/users/${formData.username}`)
        }
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
        await registerTeacher();
        setFormData(INIT_STATE);
    }

    return (
        <>
            <Navbar/>
             <div className="RegisterForm">
                <h1>Teacher</h1>
            <form className="RegisterForm-Form" onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
                <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name</label>
                <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                 <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errorDiv}
                <button>Register</button>
            </form>
        </div>
        </>
       
    )
}

export default TeacherRegisterForm;