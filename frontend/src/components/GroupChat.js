import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Comet } from "../api";

const GroupChat = () => {

    const INIT_STATE = {
        text: ""
    }

    const [formData, setFormData] = useState(INIT_STATE);
    const {courseId} = useParams();


    useEffect(() => {
        async function fetchGroupMessages() {
            let res = await Comet.getGroupMessages(courseId);
            console.log(res);
        }
        fetchGroupMessages();
    })




    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await registerTeacher();
        setFormData(INIT_STATE);
    }

}
export default GroupChat;