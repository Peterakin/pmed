import React, { useState, useEffect } from "react";
import Sidenav from "../components/Sidenav";
import "./Chatsystem.css";

const Chatsystem = () => {
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
    setChats({
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
        {
          id: 5,
          conversation_id: 1,
          sender_id: 2,
          recipient_id: 1,
          message_text: "So.....'",
          created_at: "2022-01-01 12:00:20",
        },
      ],
    });
    setNewMessage("");
  };

  return (
    <div className="chat">
      <Sidenav />
      <div>
        <div className="chat-container">
          <h2>Patient Chat</h2>
          <div className="message-list">
            {chats.messages.map((chat) => (
              <div
                key={chat.id}
                className={`message ${
                  chat.sender_id === 1 ? "sender" : "recipient"
                }`}
              >
                <p>{chat.message_text}</p>
                <span>{chat.created_at}</span>
              </div>
            ))}
          </div>
          <form action="">
            <div className="form-div">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message......"
              />
              <button className="send-button" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatsystem;
