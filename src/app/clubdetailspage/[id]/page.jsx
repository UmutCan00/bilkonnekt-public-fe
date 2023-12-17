"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import clubsData from '../../mockdata/clubData';
//import eventData from '../../mockdata/eventData';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal, FormControl} from 'react-bootstrap';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';

import { v4 } from "uuid";
import { storage } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const ClubPostCard = ({
  clubid,
  eventid,
  title,
  content,
  imageURL,
  date,
  hour,
  place,
  ge25xpoints,  
  
}) => (
    <div className="card bg-white" style={{ width: "400px" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {/*<p className="card-text">Club Id: {clubid}</p>
        <p className="card-text">Event Id: {eventid}</p>*/}
        <img
          src={imageURL}
          alt="Event Image"
          style={{
            width: "100%",
            objectFit: "cover",
            maxHeight: "100%",
          }}
        />
        <div className="card-body">
        <p className="row justify-content-left align-items-left">Content: {content}</p>
          <div className="row justify-content-left align-items-left">Date:{date} Time:{hour} Place:{place} </div>
          <div className="row justify-content-left align-items-left">GE250/251 Points:{ge25xpoints}</div>
          </div>
        </div>
      </div>
);

const ClubDetailPage = ({ params }) => {
  const { data: session } = useSession(); 
  const token = session?.backendTokens?.accessToken; 
  const currentuserid = session?.user?._id;
  const [clubData, setClubData] = useState([]);
  const [newDescription,setNewDescription]=useState([]);
  const [newEventTitle,setNewEventTitle]=useState([]);
  const [newEventPicture,setNewEventPicture]=useState([]);
  const [newEventLocation,setNewEventLocation]=useState([]);
  const [newEventDate,setNewEventDate]=useState(new Date());
  const [newEventHour,setNewEventHour]=useState('12:00');
  const [newEventPoints,setNewEventPoints]=useState([]);
  const [newEventContent,setNewEventContent]=useState([]);
  const [isThisClubExe,setIsThisClubExe]=useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  
  const [eventData,setEventData]=useState([]);

  const id  = params.id;
  console.log(id);
  const club = clubsData.find((c) => c.id === parseInt(id, 10));

  const [showModal, setShowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  let uploadedImageURL = "false";
  const handleSaveDescription = (newDescription,club) => {
    // Perform the logic to save the new description
    club.description=newDescription;
    console.log(`Saving new description: ${newDescription}`);
    try {
      fetch("http://localhost:3500/api/social/updateClub", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            clubId:params.id,
            description: newDescription
          }),
        });
    } catch (error) {
      console.log("delete prod basarisiz")
    }
    // Close the modal after saving (if that's the desired behavior)
    setShowModal(false);
  };

  

  const uploadImage = async (title,content,location,date,hour,points) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        return getDownloadURL(imageRef);
      })
      .then((downloadURL) => {
        uploadedImageURL = downloadURL;
        console.log("Image URL:", uploadedImageURL);
        alert("Image uploaded");
        return downloadURL;
      })
      .then(() => {
        fetch("http://localhost:3500/api/social/createClubPost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title,
            clubId: params.id,
            content: content,
            imageURL: uploadedImageURL,
            location: location,
            date:date,
            hour:hour,
            points:points
          }),
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
      console.log("uploadedImageURL: ", uploadedImageURL)
  };

  const handlePostClick = async (title,content,location,date,hour,points) => {
    // BURAYA KOY CENKER
    try {
      uploadedImageURL = await uploadImage(title,content,location,date,hour,points);
    } catch (error) {
      console.log("firebase error: ", error);
    }

    console.log(`Saving new event: ${title}`);
  
    // Close the modal after saving (if that's the desired behavior)
    setShowPostModal(false);
  };



  useEffect( () => {
    // This effect runs whenever selectedClub changes
    const fetchClubs = async () => {
      try {
      const response = await fetch("http://localhost:3500/api/social/getClub", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            clubId: params.id
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setClubData(data);
          console.log("clubData: ",clubData)
          setIsThisClubExe(clubData.executiveId == currentuserid )
          console.log("is this club Exe: ",isThisClubExe)
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.log("get all clubs operation error: ", error)
      }
    }
    const fetchClubPosts = async ()=>{
      try {
        const response = await fetch("http://localhost:3500/api/social/getClubPostByClub", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            clubId: params.id
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setEventData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.log("get clubs events operation error: ", error)
      }
    }
    fetchClubs();
    fetchClubPosts();
  }, []);

 

  if (!clubData) {
    return <p>Club not found</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <div className="col-md-9">
            <h1 className="text-center">{clubData.name}</h1>
            <img className="mx-auto d-block" src={clubData.imageURL} alt={clubData.name} />
            <h1 className="text-center">Club Bio goes here: {clubData.description}</h1>
            <div className="text-center mb-4">
              {isThisClubExe && (
                <button className="btn btn-success" onClick={() => setShowModal(true)}>
                  Edit Club Page</button>
              )}
               <Modal show={showModal} onHide={() => setShowModal(false)} style={{ color: "black" }}>{/**THIS IS FOR EDITING MODAL */}
                   <Modal.Header closeButton>
                   <Modal.Title style={{ color: "black" }}>Change Club Description</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                    <FormControl
                    type="text"
                    placeholder="Enter new description"
                    value={newDescription} 
                    onChange={(e) => setNewDescription(e.target.value)}  
                    />
                   </Modal.Body>
                   <Modal.Footer>
                   <button className="btn btn-success" onClick={() => handleSaveDescription(newDescription,clubData)}>Save Changes</button>
                   <button className="btn btn-danger" onClick={() => setShowModal(false)}>Close</button>                  
                   </Modal.Footer>
                   </Modal>
            </div>
            <div className="text-center mb-4">
              {isThisClubExe && (
                <button className="btn btn-danger" onClick={() => setShowPostModal(true)}>
                  Post some Events!
                </button>
              )}
                <Modal show={showPostModal} onHide={() => setShowPostModal(false)} style={{ color: "black" }}>{/**THIS IS FOR EDITING MODAL */}
                   <Modal.Header closeButton>
                   <Modal.Title style={{ color: "black" }}>POST STUFF</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                   <FormControl
                    type="text"
                    placeholder="Enter Post Title"
                    value={newEventTitle} 
                    onChange={(e) => setNewEventTitle(e.target.value)}  
                    />
                   <FormControl
                    type="text"
                    placeholder="Enter Post Content"
                    value={newEventContent} 
                    onChange={(e) => setNewEventContent(e.target.value)}  
                    />
                   <FormControl
                    type="text"
                    placeholder="Enter Post Location"
                    value={newEventLocation} 
                    onChange={(e) => setNewEventLocation(e.target.value)}  
                    />
                   {/*<FormControl
                    type="text"
                    placeholder="Enter Post Date"
                    value={newEventDate} 
                    onChange={(e) => setNewEventDate(e.target.value)}  
              />*/}
                    {/* Use DatePicker for a date picker */}
                    <DatePicker
                    selected={null}
                    onChange={(newEventDate) => setNewEventDate(newEventDate)}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Choose the Date of the Event."
                    />
                    {/*
                    <FormControl
                    type="text"
                    placeholder="Enter Post Hour"
                    value={newEventHour} 
                    onChange={(e) => setNewEventHour(e.target.value)}  
                    />*/}
                    <div  >
                      {/* Time Picker */}
                      <TimePicker
                      value={newEventHour}
                      onChange={(newEventHour) => setNewEventHour(newEventHour)}
                      clearIcon={null}  
                      clockIcon={null}
                      />
                    </div>
                    <FormControl
                    type="text"
                    placeholder="Enter Post Points"
                    value={newEventPoints} 
                    onChange={(e) => setNewEventPoints(e.target.value)}  
                    />
                      <input
                        type="file"
                        onChange={(event) => {
                          setImageUpload(event.target.files[0]);
                        }}
                      />
                    
                   </Modal.Body>
                   <Modal.Footer>
                   <button className="btn btn-success" onClick={() => handlePostClick(newEventTitle,newEventContent,newEventLocation,newEventDate,newEventHour,newEventPoints,newEventPicture)}>Post New Event</button>
                   <button className="btn btn-danger" onClick={() => setShowPostModal(false)}>Close</button>                  
                   </Modal.Footer>
                   </Modal>
            </div>
            <div className="text-center mb-2">Past Events</div>
            <div>
              {eventData && (
                <div className="row justify-content-center align-items-center" >
                  {eventData.map((post) => (
                    <ClubPostCard
                      
                      clubid={post.clubId}
                      eventid={post._id}
                      title={post.title}
                      content={post.content}
                      imageURL={post.imageURL}
                      date={post.eventDate}
                      hour={post.eventhour}
                      place={post.location}
                      ge25xpoints={post.points}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      
      `}</style>
    </div>
  );
  
          }
export default ClubDetailPage;