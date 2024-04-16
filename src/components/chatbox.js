import React, { useState, useEffect } from 'react';
import "../styles/chatbox.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';

const Chatbox = () => {
    const [usermessage, setUsermessage] = useState("");
    const [messages, setMessages] = useState([]);
    const socket = io('http://localhost:3000'); // Connect to the socket.io server
    const naam = localStorage.getItem('username');

    const handleChat = () => {
        if (usermessage.trim() !== "") {
            // Emit 'send-message' event with the user's message
            socket.emit('send-message', usermessage);
            setUsermessage(""); // Clear the input field after sending the message
        }
    };

    useEffect(() => {
        // Handle 'user-joined' event
        socket.on('user-joined', (data) => {
            setMessages((prevMessages) => [...prevMessages, `${data} joined the chat`]);
        });

        // Handle 'receive-message' event
        socket.on('receive-message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Cleanup on unmount
        return () => {
            socket.off('user-joined');
            socket.off('receive-message');
        };
    }, []);

    const onChange = (e) => {
        setUsermessage(e.target.value);
    };

    return (
        <div className='chatbot'>
            <header>
                <h2>Chatbox</h2>
            </header>
            <ul className='chatbox'>
                {messages.map((message, index) => (
                    <li key={index} className='chat outgoing my-3'>
                        <p>{message}</p>
                    </li>
                ))}
            </ul>
            <div className='chat-input'>
                <div className="input-container">
                    <textarea onChange={onChange} value={usermessage} name="message" placeholder='Enter a message...' style={{ display: 'flex' }}></textarea>
                    <span>
                        <FontAwesomeIcon onClick={handleChat} className='my-3 mx-2' style={{ fontSize: '1.4rem' }} icon={faPaperPlane} />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Chatbox;
