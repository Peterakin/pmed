import React, { useState, useEffect } from "react";
import Sidenav from "../components/Sidenav";
import "./Chatsystem.css";
import axios from "axios";
import { useUserContext } from "../context/Usercontext";

const Chatsystem = () => {
  const { userValue } = useUserContext();
  console.log(userValue);
  const [chats, setChats] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:1602/sendmessage", {
        senderId: userValue._id,
        recipientId: "66562e8d9c4d8b488e0b6d27",
        messageText: newMessage,
      });

      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessage = async () => {
    try {
      const { data } = await axios.post("http://localhost:1602/getmessages", {
        senderId: userValue._id,
        recipientId: "66562e8d9c4d8b488e0b6d27",
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
    <div className="chat">
      <Sidenav />
      <div>
        <div className="chat-container">
          <h2>Patient Chat</h2>
          <div className="message-list">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`message ${
                  chat.senderId !== userValue._id ? "sender" : "recipient"
                }`}
              >
                <p>{chat.messageText}</p>
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
