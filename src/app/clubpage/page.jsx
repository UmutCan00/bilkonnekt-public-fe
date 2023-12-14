"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import clubsData from '../mockdata/clubData';
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.css";
import { Modal } from 'react-bootstrap'; // Import Bootstrap modal
import "../globals.css";
let count=1;
const ClubsPage = () => {

  const [showModal, setShowModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState({});
  //let selectedClub=null;
  const handleClubClick = (club) => {
    setSelectedClub(club);
    //selectedClub=club;
    setShowModal(true);
    //console.log("sd",selectedClub);
  };
 
  useEffect(() => {
    // This effect runs whenever selectedClub changes
    console.log("Selected Club in effect:", selectedClub);
  }, [selectedClub]);

    return (
      <div>
        <Navbar />
        
        <div className="container">
        <h1 style={{ marginLeft: '45%' }}>Student Clubs</h1>
        <div style={{ marginLeft: '10%' }}>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {clubsData.map((club) => (
          
            <li key={club.id} style={{ marginTop: '100px', marginLeft:'20px' }}>
                <p>{club.name}</p>
                {/* <Link href={`/clubdetailspage/${club.id}`}> */} 
                <img src={club.image} alt={club.name} onClick={() => handleClubClick(club)} />
            
            </li>
             
          ))}
          </ul>
          <Modal show={showModal} onHide={() => setShowModal(false)} style={{ color: "black" }}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>{ selectedClub?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <img src={"../"+selectedClub.image} alt={selectedClub.name} />
            <h1>Club Bio goes here</h1>
    </div>
    <div> <button type="button" class="btn btn-success" style={{ color: "black" }} onClick={() => setShowModal(false)}>   Join Club</button> </div>
    <div><button type="button" class="btn btn-danger" style={{ color: "black" }} onClick={() => setShowModal(false)}>Edit Club Page</button></div>
    <div><button type="button" class="btn btn-primary" style={{ color: "black" }} onClick={() => setShowModal(false)}> <div>
    <Link href={`/clubdetailspage/${selectedClub.id}`}>Go To Club Profile</Link>
    </div></button></div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => setShowModal(false)}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
      </div>
      </div>
    );
  };
  
  export default ClubsPage;