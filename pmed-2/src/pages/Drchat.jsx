import React, { useState, useEffect } from "react";
import "./Drchat.css";
import Drsidenav from "../components/Drsidenav";
import axios from "axios";
import { useUserContext } from "../context/Usercontext";

const Drchat = () => {
  const { userValue } = useUserContext();
  const [newMessage, setNewMessage] = useState("");

  const [chats, setChats] = useState([]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:1602/sendmessage", {
        senderId: userValue._id,
        recipientId: "6640bb8dc6a5bee3b67aadd0",
        messageText: newMessage,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessage = async () => {
    try {
      const { data } = await axios.post("http://localhost:1602/getmessages", {
        senderId: userValue._id,
        recipientId: "6640bb8dc6a5bee3b67aadd0",
      });

      if (data) setChats(data.data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const intId = setInterval(() => {
      fetchMessage();
    }, 2500);

    return () => clearInterval(intId);
  }, []);

  return (
    <div className="dr-chat">
      <Drsidenav />
      <div className="dr-chat-container">
        <h2>Dr Chat</h2>
        <div className="dr-message-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`dr-message ${
                chat.senderId !== userValue._id ? "dr-sender" : "dr-recipient"
              }`}
            >
              <p>{chat.messageText}</p>
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
