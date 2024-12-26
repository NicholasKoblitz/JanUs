import React, { useContext } from "react";
import {NavLink} from 'react-router-dom'
import UserContext from "./UserContext";
import '../styles/Navbar.css'


const Navbar = () => {

    const user = localStorage.getItem("currentUser");
    const loggedIn = localStorage.getItem("token") ? true : false;
    const {setUser} = useContext(UserContext)

    const removeToken = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isTeacher");
        localStorage.removeItem('uid');
        setUser("");
    }

    return (
        <div className="Navbar">
            <div className="Navbar-title">
                <NavLink to='/'>JanUs</NavLink>
            </div>
            <div className="Navbar-links">

                {loggedIn ? 
                <div className="Navbar-signin-login">
                     <NavLink to={`/users/${user}`}>{user}</NavLink> / <NavLink to='/' onClick={removeToken}>Logout</NavLink>
            </div> 
            :
            <div className="Navbar-signin-login">
                  <NavLink to='/register/student'>Register</NavLink> / <NavLink to="/login">Login</NavLink>
            </div>
                }
            </div>
            
        </div>
    )
}

export default Navbar;