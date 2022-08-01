import React, {useEffect, useState} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Janus, Comet } from "../api";
import StudentCard from "./StudentCard";



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
                if(groups.data.data === []) {
                    setGroups(null);
                }
                else {
                    setGroups(groups.data.data);
                }
            }
            else {
                setGroups(null);

                let group = await Comet.getGroupByStudent(localStorage.getItem("currentUser"));
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
            <ul>
                {groups.map(group => 
                    <Link to={`/groups/${group.guid}`} key={`${group.guid}-${group.name}`}>
                        <li>
                            {group.name}
                        </li>
                    </Link>)
                }
            </ul>
        </>
        :
        null

        let groupDetails = group ? 
        <>
            {group.map(g => 
                <Link to={`/groups/${g.guid}/chat`} key={`${g.guid}-${g.name}`}>
                    <li>
                        {g.name}
                    </li>
                </Link>)   
            }
        </>
        :
        null


    const createGroup = () => {
        navigate('/groups/create')
    }

    const goToGroup = () => {
        navigate(`/groups/${courseId}`)
    }

    return (
        <div className="Course">
            <h2>{course}</h2>
            {isTeacher ? 
            <button onClick={createGroup}>Create Group</button>
             : 
             <button onClick={goToGroup}>Go to Group</button>}
            <hr/>
            <div>
                <h3>Students</h3>
                {details}
            </div>
            <div>
                <h3>Groups</h3>
                {isTeacher ? groupsDetails : groupDetails}
            </div>
            

        </div>
    )

}

export default Course;