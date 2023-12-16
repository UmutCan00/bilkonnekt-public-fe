"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import clubsData from '../../mockdata/clubData';
import React from 'react';


const ClubDetailPage = ({ params }) => {
  const { data: session } = useSession(); 
  const token = session?.backendTokens?.accessToken; 
  const currentuserid = session?.user?._id;
  const [clubData, setClubData] = useState([]);
  const id  = params.id;
  console.log(id);
  const club = clubsData.find((c) => c.id === parseInt(id, 10));
  const isThisClubExe = (currentuserid == clubData.executiveId)
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
      <h1>{clubData.name}</h1>
      <img src={clubData.imageURL} alt={clubData.name} />
      <h1>Club Bio goes here: {clubData.description}</h1>
      <div>
        {isThisClubExe && (
          <button class="btn btn-success" onClick={() => console.log('Edit Button clicked')}>Edit Club Page</button>
        )}
      </div>
      <div>
        {isThisClubExe && (
          <button class="btn btn-danger" onClick={() => console.log('Post club post Button clicked')}>Post some Events!</button>
        )}
      </div>
    </div>
  );
};

export default ClubDetailPage;