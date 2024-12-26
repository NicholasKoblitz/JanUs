import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Comet } from "../api";
import MemberCard from "./MemberCard";
import '../styles/Group.css'
import Navbar from "./Navbar";


const Group = () => {


    const INIT_STATE = {
        memberuid: ""
    }

    const [formData, setFormData] = useState(INIT_STATE);
    const {guid} = useParams();
    const [group, setGroup] = useState();
    const [members, setMembers] = useState();
    const [trigger, setTrigger] = useState();
    let isTeacher = localStorage.getItem("isTeacher");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchGroup() {
            if(!isTeacher) navigate('/');

            let g = await Comet.getChatGroup(guid);
            let m = await Comet.getGroupMembers(guid);
            
            setGroup(g);
            

            if(m.data.data === []) {
                setMembers(null);
            }
            else {
                setMembers(m.data.data);
            }
            setTrigger(0);
        }
        fetchGroup();
    },[trigger])

    let details = members ? 
        <>
            <h2>{group.data.data.name}</h2>
            <h3>Members</h3>
            {members.map(member => 
                <MemberCard
                    key={`${member.name}-${member.uid}`}
                    name={member.name}
                    uid={member.uid}
                />
            )}
            
        </>
        :
        null

    
        const addMemberToGroup = async () => {
            await Comet.addMemberToChatGroup(guid, formData.memberuid);
            setTrigger(1);
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
            await addMemberToGroup();
            setFormData(INIT_STATE);
            
        }


    return (
        <>
            <Navbar/>
            <div className="GroupMembers">
            
            <div className="AddMemberChatGroupForm">
            <form className="AddMemberChatGroupForm-form" onSubmit={handleSubmit}>
                <label htmlFor="memberuid">Student First Name</label>
                <input 
                    type="text"
                    name="memberuid"
                    value={formData.memberuid}
                    onChange={handleChange}
                />
                <button>Add to group</button>
            </form>
        </div>
            
            {details}
        </div>
        </>
        
    )
}

export default Group;