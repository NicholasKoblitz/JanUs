import React from "react";

const StudentCard = ({firstName, lastName, courseId}) => {
    return (
        <div className="StudentCard">
            <div className="StudentCard-title">
                <h3>{firstName} {lastName}</h3>
            </div>
            <div className="StudentCard-body">
                <p>Course ID: {courseId}</p>
            </div>
        </div>
    )
}

export default StudentCard;