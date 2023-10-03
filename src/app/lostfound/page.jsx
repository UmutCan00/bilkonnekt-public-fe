"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LostAndFoundList from "../components/LostAndFoundList";
import Navbar from "../components/Navbar";
import { useEffect } from 'react';

export default function Login() {

  const [showForm, setShowForm] = useState(false); 
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [btnText, setButtonText] = useState('Create List Item');
  const [items, setItems] = useState([]);
  useEffect(() => {
    getLostAds();
  }, []);

  const toggleForm = () => {
    if(btnText=="Create List Item"){
      setButtonText('Close');
    }else{
      setButtonText('Create List Item');
    }
    setShowForm(!showForm);
  };
  /*const items = [
    { text1: 'String 1-1', text2: 'String 1-2', text3: 'String 1-3' },
    { text1: 'String 2-1', text2: 'String 2-2', text3: 'String 2-3' },
    { text1: 'String 3-1', text2: 'String 3-2', text3: 'String 3-3' },
    { text1: 'String 1-1', text2: 'String 1-2', text3: 'String 1-3' },
    { text1: 'String 2-1', text2: 'String 2-2', text3: 'String 2-3' },
    { text1: 'String 3-1', text2: 'String 3-2', text3: 'String 3-3' },
    { text1: 'String 1-1', text2: 'String 1-2', text3: 'String 1-3' },
    { text1: 'String 2-1', text2: 'String 2-2', text3: 'String 2-3' },
    { text1: 'String 3-1', text2: 'String 3-2', text3: 'String 3-3' },
    { text1: 'String 1-1', text2: 'String 1-2', text3: 'String 1-3' },
    { text1: 'String 2-1', text2: 'String 2-2', text3: 'String 2-3' },
    { text1: 'String 3-1', text2: 'String 3-2', text3: 'String 3-3' },
    { text1: 'String 1-1', text2: 'String 1-2', text3: 'String 1-3' },
    
  ];*/

  const handleAddButtonClick = async () => {
    await createLostAd(text1,text2,text3)
  };

  const createLostAd = async (foundedPlace, lostObjDescription, deliveredPlace) =>{
    console.log("token: ", token  )
    try {
      const response = await fetch("http://localhost:3500/api/lostandfound/createItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          foundedPlace:foundedPlace,
          lostObjDescription:lostObjDescription,
          deliveredPlace:deliveredPlace
        }),
      });
      if (response.ok) {
        await getLostAds();
        toggleForm();
        setText1("")
        setText2("")
        setText3("")
        console.log("Lost Item create successful");
      } else {
        console.error("Lost Item create failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  const getLostAds = async () =>{
    console.log("token: ", token  )
    try {
      const response = await fetch("http://localhost:3500/api/lostandfound/getItems", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const transformedData=transformData(data);
        setItems(transformedData); 
        console.log("Lost Items get successful");
      } else {
        console.error("Lost Items get failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const transformData = (serverData) => {
    return serverData.map((item) => {
      return {
        text1: item.foundedPlace,
        text2: item.description,
        text3: item.deliveredPlace,
      };
    });
  };
  const card = {
    border: '1px solid #ccc',
    padding: '10px',
    borderColor: "black",
    display:"block",
    textAlign:"center",
    background:"beige"
  };
  const cardForm = {
    border: '1px solid #ccc',
    padding: '10px',
    borderColor: "black",
    display:"grid",
    textAlign:"center",
    background:"white",
    color:"black"
  };
  const cardFormInput = {
    border: '1px solid #ccc',
    padding: '10px',
    borderColor: "black",
    display:"grid",
    
    background:"white",
    color:"black"
  };
  return (
    <div
      style={{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #3498db, #C5F7F3)",
      }}
    >
      <Navbar />
      <h1>List</h1>
      <div className="card" style={card}>
        {/* "Create List Item" düğmesi */}
        <button onClick={toggleForm} style={{border:"1px solid #ccc",borderColor: "black",color:"black"}}>{btnText}</button>
        {/* Formun görüntülendiği alan */}
        {showForm && (
          <div className="form" style={cardForm}>
            <h1>Enter the location that the object is found</h1>
            <input type="text" placeholder="Founded Place" style={cardFormInput} value={text1} onChange={(e) => setText1(e.target.value)}/>
            <h1>Enter the location what is the object</h1>
            <input type="text" placeholder="Object Description" style={cardFormInput} value={text2} onChange={(e) => setText2(e.target.value)}/>
            <h1>Enter the location where you handed over the object</h1>
            <input type="text" placeholder="Delivered Place" style={cardFormInput} value={text3} onChange={(e) => setText3(e.target.value)}/>
            <button onClick={handleAddButtonClick} style={{border:"1px solid #ccc",borderColor: "black",color:"black",background:"green", margin:"5px",display:"block"}}>Add</button>
          </div>
        )}
      </div>
      <LostAndFoundList items={items}/> {}
    </div>
  );
}