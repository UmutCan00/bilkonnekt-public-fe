"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import {v4} from 'uuid';
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import Form from "react-bootstrap/Form";
//import productdata from "../mockdata/productdata";
import SaleProductCard from "../components/SaleProductCard";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Login() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList,setImageList] = useState([]);
    const imageListRef = ref(storage, "images/")
    const [newProductTitle, setNewProductTitle] = useState("");
    const [newProductPrice, setNewProductPrice] = useState("");
    const [newProductAddress, setNewProductAddress] = useState("");
    const [newProductType, setNewProductType] = useState("");
    const [newProductDescription, setNewProductDescription] = useState("");
    const [showModal, setShowModal] = useState(false);
    const { data: session } = useSession();
    const token = session?.backendTokens?.accessToken;
    let productdata;
    const getPorducts= async ()=>{
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
          productdata = transformData(data);
          console.log("Product Items get successful");
        } else {
          console.error("Product Items get failed");
        }
        console.log("get basarili")
      } catch (error) {
        console.log("get basarisiz")
      }
    }
    
    let imgURL = "foo"
    let uploadedImageURL;




    const closeModal = () => {
      setShowModal(false);
    };

    const uploadImageFirst = async ()=>{
      try {
        uploadedImageURL = await uploadImage();
      } catch (error) {
        console.log("error");
      }
   
    } 
    const uploadImage = async ()=>{
        if(imageUpload==null)return;
        const imageRef=ref(storage, `images/${imageUpload.name+v4()}`)
        uploadBytes(imageRef, imageUpload)
          .then(() => {
            return getDownloadURL(imageRef);
          })
          .then((downloadURL) => {
            uploadedImageURL = downloadURL;
            console.log('Image URL:', uploadedImageURL);
            alert('Image uploaded');
            return downloadURL;
          }).then(()=>{
            fetch(
              "http://localhost:3500/api/product/createProduct",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  title: newProductTitle,
                  price: parseFloat(newProductPrice),
                  address: newProductAddress,
                  type: newProductType,
                  description: newProductDescription,
                  imageURL: uploadedImageURL,
                }),
              }
            );
          })
          .catch((error) => {
            console.error('Error uploading image:', error);
          });
        closeModal();
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
            <Modal.Body>
              <div>
                <Form>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      value={newProductTitle}
                      onChange={(e) => setNewProductTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      min={0}
                      onKeyPress={(event) => {
                        if (!/[0-9.]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      placeholder="Enter price"
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      value={newProductAddress}
                      onChange={(e) => setNewProductAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={newProductType}
                      onChange={(e) => setNewProductType(e.target.value)}
                    >
                      <option value="selling">Selling</option>
                      <option value="donating">Donating</option>
                      <option value="borrowing">Borrowing</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter description"
                      value={newProductDescription}
                      onChange={(e) => setNewProductDescription(e.target.value)}
                    />
                  </Form.Group>
                </Form>
            </div>
            <input type="file" onChange={(event)=>{
                setImageUpload(event.target.files[0]);
                }}/>
            <button onClick={uploadImageFirst}>Upload Image</button>
            </Modal.Body>  

            {
            //imageList.map((url)=>{
                //return <img src={url}/>
            //})
            }
        </div>
    );
}
