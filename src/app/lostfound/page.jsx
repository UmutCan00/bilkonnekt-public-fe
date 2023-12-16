"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LostAndFoundList from "../components/LostAndFoundList";
import Navbar from "../components/Navbar";
import { Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LostAndFound() {
  const [showForm, setShowForm] = useState(false);
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [btnText, setButtonText] = useState("Add an Item");
  const [items, setItems] = useState([]);

  useEffect(() => {
    getLostAds();
  }, []);

  const toggleForm = () => {
    setButtonText(btnText === "Add an Item" ? "Close" : "Add an Item");
    setShowForm(!showForm);
  };

  const handleAddButtonClick = async () => {
    await createLostAd(text1, text2, text3);
  };

  const createLostAd = async (
    foundedPlace,
    lostObjDescription,
    deliveredPlace
  ) => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/lostandfound/createItem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            foundedPlace: foundedPlace,
            lostObjDescription: lostObjDescription,
            deliveredPlace: deliveredPlace,
          }),
        }
      );
      if (response.ok) {
        await getLostAds();
        toggleForm();
        setText1("");
        setText2("");
        setText3("");
        console.log("Lost Item create successful");
      } else {
        console.error("Lost Item create failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getLostAds = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/lostandfound/getItems",
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
        const transformedData = transformData(data);
        setItems(transformedData);
        console.log("Lost Items get successful");
      } else {
        console.error("Lost Items get failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const transformData = (serverData) => {
    return serverData.map((item) => {
      return {
        text1: item.foundedPlace,
        text2: item.description,
        text3: item.deliveredPlace,
      };
    });
  };

  return (
    <div>
      <Navbar />
      <Container>
        <header className="text-center">
          <h1>Welcome to Bilkonnekt Lost & Found</h1>
          <p>Search for your lost items</p>
        </header>
        <div className="card mt-3 p-4 rounded-3 shadow">
          <Button onClick={toggleForm} className="btn btn-outline-dark mt-3">
            {btnText}
          </Button>
          {showForm && (
            <Form className="card mt-3 p-4 rounded-3 shadow">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Founded Place"
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Object Description"
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Delivered Place"
                  value={text3}
                  onChange={(e) => setText3(e.target.value)}
                />
              </Form.Group>
              <Button
                onClick={handleAddButtonClick}
                className="btn btn-success"
              >
                Add
              </Button>
            </Form>
          )}
        </div>
        <div className="my-4">
          <LostAndFoundList items={items} />
        </div>
      </Container>
    </div>
  );
}
