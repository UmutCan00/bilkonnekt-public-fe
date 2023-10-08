// pages/index.js
"use client";
import React, { useState } from "react";

import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css'

import { useEffect } from "react";
import Link from "next/link";




function imageSpace() {
    return (
      <div class="imgSpace border rounded text-center ">
          <p class="mt-5">Profile Image Resides Here</p>
      </div>
    );
  }



const userData = {
  username: 'merterk',
  fullName: 'Mert Terkuran',
  email: 'mert.terkuran@ug.bilkent.edu.tr',
  bio: '3. Sinif CS öğrencisi',
  rating: "Güvenilir",
};

function userInfo(){
    return(
      
            <div class="card" style={{width: 40+"rem"}}>
            <ul class="list-group list-group-flush">
            <li class="list-group-item fs-4">UserName: {userData.username}</li>
            <li class="list-group-item fs-4">Email: {userData.email}</li>
            <li class="list-group-item fs-4">Rating: {userData.rating}</li>
            </ul>
            </div>
    
    );
}
function ProfilePage() {
    return (
        <div>
            <Navbar/>
        <div class="container-fluid ">
            
        <div class="row content d-flex">
   
    <div class="col-sm bg-secondary ">
    
    <div class="d-flex flex-row  ms-5">
        <div class="ms-5"></div>
        <div class="ms-5"></div>
        <div class="ms-5"></div>
        <div class="ms-5"></div>
        <div class="ms-5"></div>
    <div class="d-flex  mt-5 ">{imageSpace()}</div>
        </div>
        
    </div>


    <div class="col-sm bg-secondary ">    
    <div class="d-flex flex-column  mt-5">
        <p class=" display-4">{userData.fullName}</p>
        <p class=" fs-4">{userData.bio}</p>
        <div class="mt-5" >{userInfo()}</div>  
        <div class="mt-5"><button type="button" class="btn bg-success btn-lg ">Send a Message!</button>
        <button type="button" class="btn bg-warning btn-lg ms-5 ">Go to Their Shop!</button>
        </div>
        
        </div>       
    </div>


        
        
    
        
            </div>


        <style>{` 
          .row.content {
            height: 798px
            
            }

          
          .imgSpace{
            width: 500px;
            height: 500px;
            color: black;          
            border-radius: %50;          
            background: white;
          }

        
        `}</style>
        </div>
        </div>
        
        



      );
    }
 export default ProfilePage;
