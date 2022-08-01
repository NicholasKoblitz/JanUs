import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Janus} from '../api';
import UserContext from "./UserContext";



const TeacherRegisterForm = () => {

    const INIT_STATE = {
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(INIT_STATE);
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const registerTeacher = async () => {
        let janusRes = await Janus.registerTeacher(formData);
        setUser(formData.username)
        localStorage.setItem("token", janusRes)
        localStorage.setItem("currentUser", formData.username)
        localStorage.setItem("isTeacher", true);
        navigate(`/users/${formData.username}`)
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
        await registerTeacher();
        setFormData(INIT_STATE);
    }

    return (
        <div className="TeacherForm">
            <form className="TeacherForm-Form" onSubmit={handleSubmit}>
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
                <button>Register</button>
            </form>
        </div>
    )
}

export default TeacherRegisterForm;