import React, {useContext, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import {Janus} from '../api';
import UserContext from "./UserContext";
import '../styles/LoginForm.css'
import Navbar from "./Navbar";


const LoginForm = () => {

    const INIT_STATE = {
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(INIT_STATE);
    let error = useRef();
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate();


    const login = async () => {
        let res = await Janus.login(formData);
        if(res.status === 401) {
            error.current = res.message;
        }
        else{
            error.current = null;
            let {token, isTeacher, firstName} = res;
            setUser(formData.username); 
            localStorage.setItem("token", token);
            localStorage.setItem("currentUser", formData.username);
            localStorage.setItem("uid", firstName);
            if(isTeacher) localStorage.setItem("isTeacher", isTeacher);
            navigate(`/users/${formData.username}`);
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
        await login();
        setFormData(INIT_STATE);
    }


    return (
        <>
            <Navbar/>
            <div className="LoginForm">
                <h1>Login</h1>
            <form className="LoginForm-form" onSubmit={handleSubmit}>
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
                <button>Login</button>
            </form>
        </div>
        </>
        
    )

}

export default LoginForm;