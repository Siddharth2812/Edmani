import React, { useState } from 'react';
import './Chatbot.css';
import Mic from '../../assets/microphone.png';

const ChatBot = () => {
  const [inputValue, setInputValue] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    // Add the user's message to the conversation
    setConversation([...conversation, { user: true, message: inputValue }]);
    // Simulate a chatbot response (you can replace this with actual logic)
    setConversation([
      ...conversation,
      { user: true, message: inputValue },
      { user: false, message: 'ChatBot response...' },
    ]);
    setInputValue('');
  };

  return (
    <div className="ChatBot">
      <div className="ChatInput">
        <div className="ChatOutput">
          {conversation.map((message, index) => (
            <div key={index} className={message.user ? 'UserMessage' : 'ChatBotMessage'}>
              {message.user ? (
                <strong>User:</strong>
              ) : (
                <strong>ChatBot:</strong>
              )}{' '}
              {message.message}
            </div>
          ))}
        </div>
        <div className="InputContainer">
          <input
            type="text"
            placeholder="Chatbot Query"
            value={inputValue}
            onChange={handleChange}
          />
          <div className="ButtonsContainer">
            <button onClick={handleSend} className="SendBtn">
              Send
            </button>
            <button>
              <img src={Mic} alt="microphone" className="mic"></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
