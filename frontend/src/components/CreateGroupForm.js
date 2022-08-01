import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {Comet} from '../api';


const CreateGroupForm = () => {

    const INIT_STATE = {
        guid: "",
        name: ""
    }

    const [formData, setFormData] = useState(INIT_STATE);
    const navigate = useNavigate();

    const createGroup = async () => {
        await Comet.createChatGroup(formData.guid, formData.name);
        
        navigate(`/groups/${formData.guid}`)
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
        await createGroup();
        setFormData(INIT_STATE);
    }

    return (
        <div className="CreateChatGroupForm">
            <form className="CreateChatGroupForm-form" onSubmit={handleSubmit}>
            <label htmlFor="guid">Group ID</label>
                <input 
                    type="text"
                    name="guid"
                    value={formData.guid}
                    onChange={handleChange}
                />
                <label htmlFor="name">Group Name</label>
                <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <button>Create group</button>
            </form>
        </div>
    )
}

export default CreateGroupForm;