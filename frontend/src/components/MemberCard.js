import React from "react";

const MemberCard = ({name, uid}) => {
    return (
        <div className="MemberCard">
            <div className="MemberCard-title">
                <h1>{name}</h1>
            </div>
            
        </div>
    )
}

export default MemberCard;