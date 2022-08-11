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
    const username = localStorage.getItem("currentUser");
    const uid = localStorage.getItem("uid")
    const {guid} = useParams();
    const ws = new WebSocket(`ws://janusapi.herokuapp.com/api/ws/chat`)

    useEffect(() => {
        function fetchGroupMessages() {
            ws.onopen = function(evt){
                ws.send(guid)
            }

             ws.onmessage = function(evt) {
                // console.log(JSON.parse(evt.data)) 
                let data = JSON.parse(evt.data)
                
                let messageBody = document.querySelector('.message-list');
                if(messageBody) {
                    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
                }
                if(data === []) {
                    setMessages(null);
                }
                else {
                    setMessages(data);
                }
               
            }
        }
        fetchGroupMessages();
    })
  
    // useEffect(() => {
    //     async function fetchGroupMessages() {
    //         let res = await Comet.getGroupMessages(guid);
    //         let messageBody = document.querySelector('.message-list');
    //         if(messageBody) {
    //             messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    //         }

    //         if(res.data.data === []) {
    //             setMessages(null);
    //         }
    //         else {
    //             setMessages(res.data.data);
    //         }
    //         setTrigger(0)
            
    //     }
    //     fetchGroupMessages();
    // },[trigger])


    // setInterval(function() {
    //     if(trigger === 0) {
    //     setTrigger(1)
    //     }
    //     else {
    //         setTrigger(0)
    //     }
    // },3000)


    const sendMessage = async () => {
        await Comet.sendMessage(guid, formData.text, uid);
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
        sendMessage()
        setFormData(INIT_STATE);

        // ws.send(
        //     {
        //         guid:guid,
        //         text: formData.text,
        //         uid: uid
        //     })
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
                                <span className="message-name">{message.sender}</span>
                                <li className="receiver" >{message.data.text}</li>
                            </>
                        )
                    }
                }
                    
                )
                }
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