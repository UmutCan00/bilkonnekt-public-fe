"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import clubsData from '../../mockdata/clubData';
import eventData from '../../mockdata/eventData';
import React from 'react';

import { Modal, FormControl} from 'react-bootstrap';

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
  const [newEventDate,setNewEventDate]=useState([]);
  const [newEventHour,setNewEventHour]=useState([]);
  const [newEventPoints,setNewEventPoints]=useState([]);
  const [newEventContent,setNewEventContent]=useState([]);
  const id  = params.id;
  console.log(id);
  const club = clubsData.find((c) => c.id === parseInt(id, 10));
  const isThisClubExe = (currentuserid == clubData.executiveId);

  const [showModal, setShowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  
  const handleSaveDescription = (newDescription,club) => {
    // Perform the logic to save the new description
    club.description=newDescription;
    console.log(`Saving new description: ${newDescription}`);
  
    // Close the modal after saving (if that's the desired behavior)
    setShowModal(false);
  };

  const handlePostClick = (clubid,eventid,title,content,location,date,hour,points,picture) => {
    // Perform the logic to save the new description
    const newEvent=[clubid,eventid++,title,content,location,date,hour,points,picture];
    eventData.push({
      clubid: clubid,
      eventid: eventid,
      title: title,
      content: content,
      imageURL: picture,
      date: date,
      hour: hour,
      place: location,      
      ge25xpoints: points,      
    });
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
          console.log("is this club Exe: ",isThisClubExe)
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.log("get all clubs operation error: ", error)
      }
    }
    fetchClubs();
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
                   <FormControl
                    type="text"
                    placeholder="Enter Post Date"
                    value={newEventDate} 
                    onChange={(e) => setNewEventDate(e.target.value)}  
                    />
                    <FormControl
                    type="text"
                    placeholder="Enter Post Hour"
                    value={newEventHour} 
                    onChange={(e) => setNewEventHour(e.target.value)}  
                    />
                    <FormControl
                    type="text"
                    placeholder="Enter Post Points"
                    value={newEventPoints} 
                    onChange={(e) => setNewEventPoints(e.target.value)}  
                    />
                    <FormControl
                    type="text"
                    placeholder="Enter Post Picture"
                    value={newEventPicture} 
                    onChange={(e) => setNewEventPicture(e.target.value)}  
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
                      
                      clubid={post.clubid}
                      eventid={post.eventid}
                      title={post.title}
                      content={post.content}
                      imageURL={post.imageURL}
                      date={post.date}
                      hour={post.hour}
                      place={post.place}
                      ge25xpoints={post.ge25xpoints}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Add any additional styles you may need */
        .clubpost-card {
          /* Add styles for the clubpost-card class if necessary */
        }
      `}</style>
    </div>
  );
  
          }
export default ClubDetailPage;