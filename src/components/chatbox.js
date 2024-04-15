import React from 'react';
import "../styles/chatbox.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot } from '@fortawesome/free-solid-svg-icons';

const Chatbox = () => {
  return (
    <div className='chatbot'>
      <header>
        <h2>Chatbox</h2>
      </header>
      <ul className='chatbox'>
        <li className='chat incoming my-3'>
          <span className='material-symbols-outlined'><FontAwesomeIcon style={{ fontSize: '1.4rem' }} icon={faRobot} /></span>
          <p className='mx-2'>Hii there 🖐️! I am your virtual assistant.</p>
        </li>
        <li className='chat outgoing my-3'>
          <p>Hii there Howdfjkd </p>
          {/* <span><FontAwesomeIcon style={{ fontSize: '1.4rem' }} className='mx-2' icon={faUser} /></span> */}
        </li>
      </ul>
      <div className='chat-input'>
        <div className="input-container">
          <textarea placeholder='Enter a message...' style={{ display: 'flex' }}></textarea>
          <span>
            <FontAwesomeIcon className='my-3 mx-2' style={{ fontSize: '1.4rem' }} icon={faPaperPlane} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
