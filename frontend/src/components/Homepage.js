import React from "react";
import { Link } from "react-router-dom";
import '../styles/Homepage.css'
import Navbar from "./Navbar";


const Homepage = () => {
    return (
            <div className="Homepage ">
                <Navbar/>
                <h2 className="Homepage-titles" >Welcome to JanUs</h2>
                <span className="Homepage-span">Creating Groups Made Easy</span>
                <div className="links">
                    <div className="student">
                        <Link to='/register/student' >New Student</Link>
                    </div>
                    <div className="teacher">
                        <Link to='/register/teacher' >New Teacher</Link>
                    </div>
                    <div className="login">
                        <Link to='/login'>Returning User</Link>
                    </div>
                </div>
                
            </div>
          
        
    )
}

export default Homepage;