"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import clubData from '../mockdata/clubData';

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import { Modal } from "react-bootstrap"; // Import Bootstrap modal
import "../globals.css";
let count = 1;
const ClubsPage = () => {
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const [showModal, setShowModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState({});
  const [clubData, setClubData] = useState([]);
  //let selectedClub=null;
  const handleClubClick = (club) => {
    setSelectedClub(club);
    //selectedClub=club;
    setShowModal(true);
    //console.log("sd",selectedClub);
  };

  useEffect(() => {
    // This effect runs whenever selectedClub changes
    const fetchClubs = async () => {
      try {
        const response = await fetch(
          "http://localhost:3500/api/social/getClubs",
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
          console.log(data);
          setClubData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.log("get all clubs operation error: ", error);
      }
    };
    fetchClubs();
    console.log("Selected Club in effect:", selectedClub);
  }, [selectedClub]);

  return (
    <div>
      <Navbar />

      <div className="container">
        <h1
          className="card text-center titleColor text-white"
          style={{ marginLeft: "33%", fontSize: "20px", maxWidth: "500px" }}
        >
          Student Clubs
        </h1>
        <div style={{ marginLeft: "15%", maxWidth: "1000px" }}>
          <ul
            className="card m-2 titleColor "
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0px",
            }}
          >
            {clubData.map((club) => (
              <li
                className="card m-2"
                key={club.id}
                style={{ marginTop: "30px", marginLeft: "0px" }}
              >
                <p>{club.name}</p>
                {/* <Link href={`/clubdetailspage/${club.id}`}> */}
                <img
                  src={club.imageURL}
                  alt={club.name}
                  onClick={() => handleClubClick(club)}
                />
              </li>
            ))}
          </ul>
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            style={{ color: "black" }}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "black" }}>
                {selectedClub?.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <img src={selectedClub.imageURL} alt={selectedClub.name} />
                <h1>Club Bio goes here: {selectedClub.description}</h1>
              </div>
              <div>
                {" "}
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ color: "black" }}
                  onClick={() => setShowModal(false)}
                >
                  Join Club
                </button>{" "}
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ color: "black" }}
                  onClick={() => setShowModal(false)}
                >
                  {" "}
                  <div>
                    <Link href={`/clubdetailspage/${selectedClub._id}`}>
                      Go To Club Profile
                    </Link>
                  </div>
                </button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={() => setShowModal(false)}>Close</button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <style jsx>{`
        .titleColor {
          background-color: #0b1356;
        }
      `}</style>
    </div>
  );
};

export default ClubsPage;
