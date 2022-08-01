import React from "react";

const CourseCard = ({courseId, name}) => {
    return (
        <div className="CourseCard">
            <div className="CourseCard-title">
                <h3>{name}</h3>
            </div>
            <div className="CourseCard-body">
                <p>Course ID: {courseId}</p>
            </div>
        </div>
    )
}

export default CourseCard;