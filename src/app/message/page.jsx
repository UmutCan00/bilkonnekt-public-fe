"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";
const MessagingPage = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const prevMessagesLength = useRef(0);
  const [showModal, setShowModal] = useState(false);
  const [contractData, setContractData] = useState({
    location: "",
    date: "",
    isfinal: false,
    // Other fields for the contract
  });
  const [currentContract, setCurrentContract] = useState({});
  const [isBuyer, setIsBuyer] = useState(false);
  const [showFinalContract, setShowFinalContract] = useState(false);

  const hasContract =
    currentContract && Object.keys(currentContract).length > 0;

  const handleAcceptContract = (id) => {
    // Logic to handle accepting the contract
    console.log("Contract accept called");
    acceptContract(id);
    console.log("Contract Accepted");
    window.location.reload();
  };
  const { data: session } = useSession();
  const handleDeclineContract = () => {
    // Logic to handle declining the contract
    console.log("Contract Declined");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const currentDate = new Date();
  const isBanned = session?.user?.isBanned;
  const router = useRouter();
  if (isBanned) router.push("/");

  const getDialogContracts = async (chatId) => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/dialog/getDialogContracts",
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
        console.log("dialogcontracts", data.results);
        setCurrentContract(data.results[data.results.length - 1]);
        console.log(data.results[data.results.length - 1]);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createContract = async (chatId) => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/dialog/createContract",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            dialogId: chatId,
            returnLocation: contractData.location,
            returnDate: contractData.date,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const acceptContract = async (contractId) => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/dialog/acceptContract",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            contractId: contractId,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleModalSubmit = () => {
    console.log("Contract Data:", contractData);
    createContract(currentChat._id);
    setShowModal(false);
  };
  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom when messages change
  }, [messages]);
  const [chats, setChats] = useState([]);
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
      getDialogContracts(currentChat._id);
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
        setIsBuyer(currentChat.buyerId == currentuserid);
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
    console.log("current chat", currentChat);
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
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        {message.description}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "black",
                          marginTop: "0px",
                        }}
                      >
                        {getTimeString(message.updated_at)}{" "}
                      </div>
                    </div>
                  </div>
                ))
              : null}
            {hasContract && (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                {!isBuyer && !currentContract.isSellerAccepted ? (
                  <>
                    <h4>
                      You Should Accept Your Proposed Contract or Create a New
                      One:
                    </h4>
                    {/* Display contract info */}
                    <p>Unique Contract ID: {currentContract._id}</p>
                    <p>Date YYYY-MM-DD: {currentContract.returnDate}</p>
                    <p>Return Location: {currentContract.returnLocation}</p>
                    {/* Show See Contract button */}
                    <Button
                      variant="success"
                      onClick={() => handleAcceptContract(currentContract._id)}
                    >
                      Accept
                    </Button>
                  </>
                ) : currentContract.isSellerAccepted &&
                  currentContract.isBuyerAccepted ? (
                  <>
                    <h4>You Have a Finalized Contract:</h4>
                    <p>Unique Contract ID: {currentContract._id}</p>
                    <p>Date YYYY-MM-DD: {currentContract.returnDate}</p>
                    <p>Return Location: {currentContract.returnLocation}</p>
                  </>
                ) : isBuyer &&
                  currentContract.isSellerAccepted &&
                  !currentContract.isBuyerAccepted ? (
                  <>
                    <h4>
                      You Can Accept the Proposed Contract or Create a New One:
                    </h4>
                    {/* Display contract info */}
                    <p>Unique Contract ID: {currentContract._id}</p>
                    <p>Date YYYY-MM-DD: {currentContract.returnDate}</p>
                    <p>Return Location: {currentContract.returnLocation}</p>
                    {/* Buttons */}
                    <Button
                      variant="success"
                      onClick={() => handleAcceptContract(currentContract._id)}
                    >
                      Accept
                    </Button>
                  </>
                ) : (
                  <>
                    <h4>
                      Waiting For Other Party to Accept the Contract, You Can
                      Create a New Contract in the Meantime
                    </h4>
                    <p>Unique Contract ID: {currentContract._id}</p>
                    <p>Date YYYY-MM-DD: {currentContract.returnDate}</p>
                    <p>Return Location: {currentContract.returnLocation}</p>
                  </>
                )}
              </div>
            )}
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
            {!(
              currentContract?.isSellerAccepted &&
              currentContract?.isBuyerAccepted
            ) && (
              <button
                onClick={() => setShowModal(true)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Create Contract
              </button>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Create Contract</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      value={contractData.location}
                      onChange={(e) =>
                        setContractData({
                          ...contractData,
                          location: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={contractData.date}
                      onChange={(e) =>
                        setContractData({
                          ...contractData,
                          date: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleModalSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
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
            {chat.sellerName} {"\u2013"} {chat.buyerName}, Item:{" "}
            {chat.dialogType}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessagingPage;
