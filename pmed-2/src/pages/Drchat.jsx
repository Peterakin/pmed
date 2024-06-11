import React, { useState, useEffect } from "react";
import "./Drchat.css";
import Drsidenav from "../components/Drsidenav";

const Drchat = () => {
  const [chats, setChats] = useState({
    conversations: [
      {
        id: 1,
        user1_id: 1,
        user2_id: 2,
        created_at: "2022-01-01 12:00:00",
      },
    ],
    messages: [
      {
        id: 1,
        conversation_id: 1,
        sender_id: 1,
        recipient_id: 2,
        message_text: "Hello, how are you?",
        created_at: "2022-01-01 12:00:05",
      },
      {
        id: 2,
        conversation_id: 1,
        sender_id: 2,
        recipient_id: 1,
        message_text: "I'm good, thanks!",
        created_at: "2022-01-01 12:00:10",
      },
      {
        id: 3,
        conversation_id: 1,
        sender_id: 1,
        recipient_id: 2,
        message_text: "What's up?",
        created_at: "2022-01-01 12:00:15",
      },
      {
        id: 4,
        conversation_id: 1,
        sender_id: 2,
        recipient_id: 1,
        message_text: "Not much, just chillin'",
        created_at: "2022-01-01 12:00:20",
      },
    ],
  });

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    // Add new message to the conversation
    e.preventDefault();
    setChats(state=>{
      messages:[
        ...state.messages,
        {
          id:5,
          conversation_id:1,
          recipient_id:2,
          created_at:"2022-01-01 12:00:20",
          message_text:"is that me??"
        }
      ]
    });
    setNewMessage("");
  };

  return (
    <div className="dr-chat">
      <Drsidenav />
      <div className="dr-chat-container">
        <h2>Dr Chat</h2>
        <div className="dr-message-list">
          {chats.messages.map((chat) => (
            <div
              key={chat.id}
              className={`dr-message ${
                chat.sender_id === 1 ? "dr-sender" : "dr-recipient"
              }`}
            >
              <p>{chat.message_text}</p>
              <span>{chat.created_at}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <div className="dr-form-div">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message......"
            />
            <button className="dr-send-button" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Drchat;
