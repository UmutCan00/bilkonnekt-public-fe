"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";

const MessagingPage = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom when messages change
  }, [messages]);
  const [chats, setChats] = useState([]);
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const currentuserid = session?.user?._id;
  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const response = await fetch(
          "http://localhost:3500/api/dialog/getDialogsOfUser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Loaded!");
          console.log(data);
          setChats(data);
        } else {
          console.error("Failed to load");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token) {
      fetchData(token);
    }
  }, [token]);

  const handleChatClick = (chatId) => {
    console.log("all chats", chats);
    const selectedChat = chats.find((chat) => chat._id === chatId);
    setCurrentChat(selectedChat);
    setMessages([
      { id: 1, text: "Hello!", sender: "friend" },
      { id: 2, text: "How are you?", sender: "friend" },
    ]);

    fetchmessage(chatId);
  };

  const fetchmessage = async (chatId) => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/dialog/getDialogMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            dialogId: chatId,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Loaded message!");
        console.log(data);
        setMessages(data);
      } else {
        console.error("Failed to load");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const sendmessage = async (chatId) => {
    if (inputValue.length < 2) {
      console.log("error");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3500/api/message/sendMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            dialogId: chatId,
            description: inputValue,
          }),
        }
      );

      if (response.ok) {
        console.log("Sent message!");
      } else {
        console.error("Failed to send");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMessageSend = (chatId) => {
    if (currentChat && inputValue.trim() !== "") {
      sendmessage(chatId);
      fetchmessage(chatId);
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
                key={message._id}
                style={{
                  textAlign:
                    message.senderId === currentuserid ? "right" : "left",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    backgroundColor:
                      message.senderId === currentuserid
                        ? "#4CAF50"
                        : "#e5e5ea",
                    color: message.senderId === currentuserid ? "#fff" : "#000",
                    maxWidth: "70%",
                  }}
                >
                  {message.description}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Reference for scrolling */}
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
              onClick={() => handleMessageSend(currentChat._id)}
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
            key={chat._id}
            onClick={() => handleChatClick(chat._id)}
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
            {chat.buyerId}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessagingPage;
