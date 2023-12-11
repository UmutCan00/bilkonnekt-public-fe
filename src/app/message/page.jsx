"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const MessagingPage = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats] = useState([
    // Mock data for chats
    { id: 1, name: "Friend 1" },
    { id: 2, name: "Friend 2" },
    { id: 3, name: "Friend 3" },
  ]);

  const handleChatClick = (chatId) => {
    const selectedChat = chats.find((chat) => chat.id === chatId);
    setCurrentChat(selectedChat);
    setMessages([
      // Mock data for selected chat's messages
      { id: 1, text: "Hello!", sender: "friend" },
      { id: 2, text: "How are you?", sender: "friend" },
    ]);
  };

  const handleMessageSend = () => {
    if (currentChat && inputValue.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: "me",
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const [inputValue, setInputValue] = useState("");

  const handleBackButtonClick = () => {
    setCurrentChat(null);
    setMessages([]);
  };

  if (currentChat) {
    return (
      <div>
        <Navbar />
        <div
          style={{ display: "flex", flexDirection: "column", height: "90vh" }}
        >
          <button
            onClick={handleBackButtonClick}
            style={{
              cursor: "pointer",
              display: "block",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f0f0f0",
              textAlign: "left",
              width: "5%",
              fontSize: "16px",
              color: "black",
              alignItems: "right",
            }}
          >
            Back
          </button>
          <div
            style={{
              flex: 1,
              overflowY: "scroll",
              padding: "20px",
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  textAlign: message.sender === "me" ? "right" : "left",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    backgroundColor:
                      message.sender === "me" ? "#4CAF50" : "#e5e5ea",
                    color: message.sender === "me" ? "#fff" : "#000",
                    maxWidth: "70%",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #ccc", padding: "20px" }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginRight: "10px",
                color: "black",
              }}
            />
            <button
              onClick={handleMessageSend}
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Chats</h2>
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            style={{
              cursor: "pointer",
              display: "block",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f0f0f0",
              textAlign: "left",
              width: "50%",
              fontSize: "16px",
              color: "black",
            }}
          >
            {chat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessagingPage;
