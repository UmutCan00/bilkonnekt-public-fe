"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import clubsData from '../../mockdata/clubData';
import React from 'react';


const ClubDetailPage = ({ params }) => {

  
  const id  = params.id;
  console.log(id);
  const club = clubsData.find((c) => c.id === parseInt(id, 10));

  if (!club) {
    return <p>Club not found</p>;
  }

  return (
    <div>
      <Navbar />
      <h1>{club.name}</h1>
      <img src={"../"+club.image} alt={club.name} />
      <h1>Club Bio goes here</h1>
    </div>
  );
};

export default ClubDetailPage;