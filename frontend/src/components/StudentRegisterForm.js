import React, {useContext, useRef, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import {Janus, Comet} from '../api';
import UserContext from "./UserContext";
import '../styles/RegisterForm.css'
import Navbar from "./Navbar";


const StudentRegisterForm = () => {

    const INIT_STATE = {
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(INIT_STATE);
    let error = useRef();
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate();
    let err;

    const registerStudent = async () => {
        let janusRes = await Janus.registerStudent(formData);

        if(janusRes.status === 400) {
            error.current = janusRes.message; 
        }
        else {
            error.current = null;
            await Comet.createChatUser(formData.firstName, formData.username);
            setUser(formData.username)
            localStorage.setItem("token", janusRes)
            localStorage.setItem("currentUser", formData.username)
            localStorage.setItem('uid', formData.firstName)
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
        try {
            await registerStudent();
        }
        catch(err) {
            console.log("Testing error")
            throw err;
        }
        
        setFormData(INIT_STATE);
    }

    return (
        <>
            <Navbar/>
            
            <div className="RegisterForm">
            <h1>Student</h1>
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
                    <Link to='/register/teacher'>Go To Teacher Register</Link>
            </form>
            
        </div>
        </>
       
    )
}

export default StudentRegisterForm;