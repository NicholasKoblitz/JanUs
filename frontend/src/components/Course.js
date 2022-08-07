import React, {useEffect, useState} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Janus, Comet } from "../api";
import StudentCard from "./StudentCard";
import '../styles/Course.css';
import Navbar from "./Navbar";



const Course = () => {

    const {courseId} = useParams();
    const [course, setCourse] = useState();
    const [students, setStudents] = useState();
    const [groups, setGroups] = useState();
    const [group, setGroup] = useState();
    const navigate = useNavigate();
    let isTeacher = localStorage.getItem("isTeacher") ? true : false

    useEffect(() => {
        async function fetchCourse() {
            let token = localStorage.getItem("token");
            let res = await Janus.getSingleCourse(courseId, token)
            let students = await Janus.getAllStudentsByCourse(courseId, token);

            if(isTeacher) {
                setGroup(null);

                let groups = await Comet.getGroupsByCourse(courseId);
                console.log(groups)
                if(groups.data.data === []) {
                    setGroups(null);
                }
                else {
                    setGroups(groups.data.data);
                }
            }
            else {
                setGroups(null);

                let group = await Comet.getGroupByStudent(localStorage.getItem("uid"));
                if(group.data.data === []) {
                    setGroup(null);
                }
                else {
                    setGroup(group.data.data);
                }
            }
            
            setCourse(res.name);
           

            if(students === []) {
                setStudents(null);
            }
            else {
                setStudents(students);
            }
        }
        fetchCourse()
    }, [])


    let details = students ?
        <>
            {students.map(student => 
                <StudentCard
                    key={`${courseId}-${student.firstName}-${student.lastName}`}
                    firstName={student.firstName}
                    lastName={student.lastName}
                    courseId={courseId}
                />
            )}
        </>
        :
        null

        let groupsDetails = groups ?
        <>
            
                {groups.map(group => 
                    <Link to={`/groups/${group.guid}`} key={`${group.guid}-${group.name}`}>
                        
                            {group.name}
                        
                    </Link>)
                }
           
        </>
        :
        null

        let groupDetails = group ? 
        <>
            {group.map(g => 
                <Link to={`/groups/${g.guid}/chat`} key={`${g.guid}-${g.name}`}>
                    
                        {g.name}
                    
                </Link>)   
            }
        </>
        :
        null


    const createGroup = () => {
        navigate(`/courses/${courseId}/groups/create`)
    }

    const goToGroup = () => {
        navigate(`/groups/${courseId}`)
    }

    return (
        <>
            <Navbar/>
            <div className="Course">
            <h2>{course}</h2>
            
            
            <div>
                <h3 className="Course-titles">Students</h3>
                {details}
            </div>
            <div className="Course-groups">
                <h3>Groups</h3>
                {isTeacher ? 
            <button onClick={createGroup}>Create Group</button>
             : 
             null}
                {isTeacher ? groupsDetails : groupDetails}
            </div>
        </div>
        </>
        
    )

}

export default Course;