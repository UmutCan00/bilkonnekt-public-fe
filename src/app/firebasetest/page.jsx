"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

import {v4} from 'uuid';
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";



export default function Login() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList,setImageList] = useState([]);
    const imageListRef = ref(storage, "images/")

    const uploadImage = ()=>{
        if(imageUpload==null)return;
        const imageRef=ref(storage, `images/${imageUpload.name+v4()}`)
        uploadBytes(imageRef, imageUpload).then(()=>{
            alert("image uploaded");
        })
    }

    useEffect(()=>{
        listAll(imageListRef).then((response)=>{
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImageList((prev)=>[...prev,url]);
                })
            })
        })
    }, [])

    return(
        <div className="firebasetest">
            <input type="file" onChange={(event)=>{
                setImageUpload(event.target.files[0]);
                }}/>
            <button onClick={uploadImage}>Upload Image</button>

            {imageList.map((url)=>{
                return <img src={url}/>
            })}
        </div>
    );
}
