import React, { useState } from 'react';
import './LiveChat.css'

function LiveChat() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [messageCounter, setMessageCounter] = useState(3);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setMessageCounter(0); // Reset message counter when chat is closed
  };

  const closeChat = (e) => {
    e.preventDefault();
    setIsChatOpen(false);
  };

  return (
    <div id="live-chat">
      <header className="clearfix" onClick={toggleChat}>
        <a href="#" className="chat-close" onClick={closeChat}>x</a>
        <h4>Rational AI</h4>
        {isChatOpen && <span className="chat-message-counter">{messageCounter}</span>}
      </header>
      {isChatOpen && (
        <div className="chat">
          <div className="chat-history">
            <div className="chat-message clearfix">
              <img src="http://lorempixum.com/32/32/people" alt="" width="32" height="32" />
              <div className="chat-message-content clearfix">
                <span className="chat-time">13:35</span>
                <h5>Bob</h5>
                <p>How are you feeling today?</p>
              </div>
            </div>
            <hr />
            {/* Add more chat messages here */}
          </div>
          
          <form action="#" method="post">
            <fieldset>
              <input type="text" placeholder="Type here!" autoFocus />
              <input type="hidden" />
            </fieldset>
          </form>
        </div>
      )}
    </div>
  );
}

export default LiveChat;
