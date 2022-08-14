import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Comet } from "../api";
import '../styles/GroupChat.css';
import Navbar from "./Navbar";

const GroupChat = () => {

    const INIT_STATE = {
        text: ""
    }

    const [formData, setFormData] = useState(INIT_STATE);
    const [messages, setMessages] = useState();
    const [trigger, setTrigger] = useState();
    const uid = localStorage.getItem("uid")
    const {guid} = useParams();
    const ws = new WebSocket(`wss://janusapi.herokuapp.com/api/ws/chat`)

    

    useEffect(() => {
        function fetchGroupMessagesAndSend() {
            ws.onopen = function(evt){
                ws.send(guid)
            }

             ws.onmessage = function(evt) {
                // console.log(JSON.parse(evt.data)) 
                let data = JSON.parse(evt.data)

                if(data === []) {
                    setMessages(null);
                }
                else {
                    setMessages(data);
                    }
            }
        }
        fetchGroupMessagesAndSend();
    })

    useEffect(() => {
        function fetchGroupMessagesOnce() {
            setTimeout(function(){
                let messageBody = document.querySelector('.message-list');

                if(messageBody) {
                    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
                }
            },700)
            
        }
        fetchGroupMessagesOnce()
    }, [])


    const sendMessage = async () => {
        await Comet.sendMessage(guid, formData.text, uid);
    } 

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
        let messageBody = document.querySelector('.message-list');
        if(messageBody) {
            messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendMessage()
        setFormData(INIT_STATE);
        let messageBody = document.querySelector('.message-list');
        if(messageBody) {
            messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
        }
    }


    const details = messages ? 
        <>
            <ul className="message-list">
                {messages.map(message => {

                    if(!message.deletedAt) {
                        if(message.sender === uid.toLowerCase()) {
                            return <li className="sender" >{message.data.text}</li>
                        }

                        return (
                            <>
                                <span className="message-name" >{message.sender}</span>
                                <li className="receiver" >{message.data.text}</li>
                            </>
                        )
                    }
                })}
            </ul>
        </> 
        : null;

    return (
        <>
        
            <Navbar/>
            <div className="GroupChat">
            
            <div className="GroupChat-messages">
                <div className="messages-border"></div>
                {details}
                
            </div>
            <form className="GroupChat-form" onSubmit={handleSubmit}>
                <input
                    name="text" 
                    placeholder="Type Message" 
                    value={formData.text}
                    onChange={handleChange}
                    />
                    <button>Send</button>
            </form>
        </div>
        
        </>
        
    )

}
export default GroupChat;