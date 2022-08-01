import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Janus} from '../api';
import UserContext from "./UserContext";


const LoginForm = () => {

    const INIT_STATE = {
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(INIT_STATE);
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate();


    const login = async () => {
        let {token, isTeacher} = await Janus.login(formData);
        setUser(formData.username);
        localStorage.setItem("token", token);
        localStorage.setItem("currentUser", formData.username);
        if(isTeacher) localStorage.setItem("isTeacher", isTeacher);
        navigate(`/users/${formData.username}`);
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
        await login();
        setFormData(INIT_STATE);
    }


    return (
        <div className="LoginForm">
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
                <button>Login</button>
            </form>
        </div>
    )

}

export default LoginForm;