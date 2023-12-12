"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";

const MessagingPage = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const prevMessagesLength = useRef(0);
  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const currentDate = new Date();

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
  useEffect(() => {
    let intervalId;
    if (currentChat) {
      intervalId = setInterval(() => {
        fetchmessage(currentChat._id); // Fetch messages every 2 seconds
      }, 2000);
    }

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, [currentChat]);

  const handleChatClick = (chatId) => {
    prevMessagesLength.current = 0;
    console.log("all chats", chats);
    const selectedChat = chats.find((chat) => chat._id === chatId);
    setCurrentChat(selectedChat);

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
        if (data.length > prevMessagesLength.current) {
          setMessages(data);
          prevMessagesLength.current = data.length; // Update previous message length
        }
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
      sendmessage(chatId).then(fetchmessage(chatId));
      setInputValue("");
    }
  };

  const [inputValue, setInputValue] = useState("");

  const handleBackButtonClick = () => {
    setCurrentChat(null);
    setMessages([]);
  };

  const getTimeString = (timeString) => {
    if (!timeString) return "";
    const options = {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    };
    const messageDate = new Date(timeString);

    if (
      messageDate.getMonth() !== currentDate.getMonth() ||
      messageDate.getDate() !== currentDate.getDate()
    ) {
      // Different month or day, display month and day
      return messageDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    } else {
      // Same day, only display time
      return messageDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
    }
  };

  if (currentChat) {
    console.log("current chat", messages);
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
            {messages.length !== 0
              ? messages.map((message) => (
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
                        display: "flex",
                        flexDirection: "column",
                        alignItems:
                          message.senderId === currentuserid
                            ? "flex-end"
                            : "flex-start",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor:
                            message.senderId === currentuserid
                              ? "#4CAF50"
                              : "#e5e5ea",
                          color:
                            message.senderId === currentuserid
                              ? "#fff"
                              : "#000",
                          borderRadius: "8px",
                          padding: "8px 12px",
                          maxWidth: "70%",
                        }}
                      >
                        {message.description}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#999",
                          marginTop: "0px",
                        }}
                      >
                        {getTimeString(message.updated_at)}{" "}
                      </div>
                    </div>
                  </div>
                ))
              : null}
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
        <div
          style={{
            fontSize: "32px",
            color: "black",
            marginTop: "0px",
            marginBottom: "10px",
          }}
        >
          {"Chats"}
        </div>

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
