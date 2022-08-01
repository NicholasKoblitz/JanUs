import React from "react";

const MemberCard = ({name, uid}) => {
    return (
        <div className="MemberCard">
            <div className="MemberCard-title">
                <h3>{name}</h3>
            </div>
            
        </div>
    )
}

export default MemberCard;