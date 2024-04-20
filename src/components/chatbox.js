import React, { useState, useEffect } from 'react';
import "../styles/chatbox.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot,faCar } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';

const Chatbox = (props) => {
    const { reciever } = props;
    const [rec2, setRec2] = useState("");
    const [usermessage, setUsermessage] = useState("");
    const [messages, setMessages] = useState(new Set());
    const socket = io('http://localhost:3000'); // Connect to the socket.io server
    const useremail = localStorage.getItem('sender');
    const naam = localStorage.getItem('username');

    useEffect(() => {
        setRec2(reciever);
    }, [reciever]);

    const appendMessage = (message, position) => {
        const newMessage = { message, position };
        if (!messages.has(newMessage)) {
            setMessages(prevMessages => new Set([...prevMessages, newMessage]));
        }
    };


    useEffect(() => {
        const handleReceiveMessage = ({ message, sender, reciever }) => {
            if (useremail !== sender) {
                appendMessage(message, 'incoming');
            }
        };
        socket.on('recieve-message', handleReceiveMessage);

        return () => {
            socket.off('recieve-message', handleReceiveMessage);
        };
    }, [socket, useremail]);

    useEffect(() => {
        socket.emit('new-user-joined', naam);
        // appendMessage(usermessage, 'outgoing');
    }, [naam, socket]);

    const handleChat = () => {
        socket.emit('send-message', { message: usermessage, sender: useremail, reciever: reciever });
        appendMessage(usermessage, 'outgoing');
        setUsermessage("");
    };

    const onChange = (e) => {
        setUsermessage(e.target.value);
    };

    return (
        <div className='chatbot'>
            <header>
                <h2>Chatbox</h2>
            </header>
            <ul className='chatbox'>
                <li className='chat incoming my-3'>
                    <span className='material-symbols-outlined'><FontAwesomeIcon style={{ fontSize: '1.4rem' }} icon={faRobot} /></span>
                    <p className='mx-2'>Hii there 🖐️, Please wait while the driver connects to the chat!</p>
                    {/* <p className='mx-2' style={{display:'block'}}>.</p> */}
                </li>
                {[...messages].map((msg, index) => (
                    // {<FontAwesomeIcon style={{ fontSize: '1.4rem' }} icon={faRobot} />}
                    <li key={index} className={`chat ${msg.position} my-3`}>
                        {(msg.position === 'incoming') && <span className='material-symbols-outlined'><FontAwesomeIcon style={{ fontSize: '1.4rem' }} icon={faCar} /></span>} <p>{msg.message}</p>
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
};

export default Chatbox;
