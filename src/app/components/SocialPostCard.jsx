"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from 'next/link';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Form from "react-bootstrap/Form";

const SocialPostCard = ({
  id,
  sharer,
  sharerName,
  title,
  content,
  type,
  imageURL,
  likeCount,
}) => {
  

  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;

  const currentuserid = session?.user?._id;
  const isEditButtonVisible = (currentuserid == sharer)


  const likeFunc = () =>{
    try {
      fetch("http://localhost:3500/api/social/likePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId: id,
        }),
      });
    } catch (error) {
      console.log("like operation error: ", error)
    }
    window.location.reload();
    
  }
  return (
    <>
      <style jsx global>{`
        /* Global styles to remove underlines from links */
        a {
          text-decoration: none;
        }
      `}</style>

      <div className="card bg-white" style={{ width: '400px',height:'450px' }}>
        <div className="card-body">
          
          <div style={{ marginLeft: '10px', display: 'flex',justifyContent: 'space-between', flexDirection: 'row' }}>
            <h5 className="card-title">{title}</h5>
            
            {isEditButtonVisible && (
              <>
                <Link href={`/feed/${id}`} passHref>
                  <Button className="btn btn-primary "    > Edit My Post</Button>
                </Link>
              </>
            )}
            
          </div>
          <p className="card-text text-left">Sharer: {sharerName}</p>
          {imageURL && (
        <div
          className="card-img-top"
          style={{
            height: "200px", // Set a fixed height for uniformity
            overflow: "hidden", // Hide overflowing content
          }}
        >
          <img
            src={imageURL}
            alt="Product Image"
            style={{
              width: "100%", // Ensure the image covers the container width
              objectFit: "cover", // Crop the image while maintaining aspect ratio
              maxHeight: "100%", // Ensure the image covers the container height
            }}
          />
        </div>
      )}
          <p className= "card-text">Content: {content}</p>
          <div className= "card-body">
            <p>
              <i className="bi bi-heart-fill text-danger"></i> {" "}
              {likeCount} Likes
            </p>
            <Link href={`/feed/${id}`} passHref>
                <Button
                  className="btn btn-primary mr-2"
                  variant="info"
                  
                >
                  <i className="bi bi-chat"></i> See Comments
                </Button>
            </Link>
              <Button className="btn btn-danger"
                onClick={likeFunc}
              >
                <i className="bi bi-heart"></i> Like
              </Button>
              
          </div>
        </div>

        
      </div>
      
    </>
  );
};

export default SocialPostCard;