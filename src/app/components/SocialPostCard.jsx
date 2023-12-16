"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from 'next/link';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useSession } from "next-auth/react";

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
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const handleCommentsModalOpen = () => setShowCommentsModal(true);
  const handleCommentsModalClose = () => setShowCommentsModal(false);

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
  // Dummy comments data (replace with actual comments data)
  const comments = [
    { id: 1, text: 'Great post!', user: 'User1' },
    { id: 2, text: 'Interesting thoughts.', user: 'User2' },
    // Add more comments as needed
  ];

  return (
    <>
      <style jsx global>{`
        /* Global styles to remove underlines from links */
        a {
          text-decoration: none;
        }
      `}</style>

      <div className="card bg-white" style={{ width: '400px' }}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Sharer: {sharerName}</p>
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
            <Button
              className="btn btn-primary mr-2"
              variant="info"
              onClick={handleCommentsModalOpen}
            >
              <i className="bi bi-chat"></i> See Comments
            </Button>
            <Button className="btn btn-primary"
              onClick={likeFunc}
            >
              <i className="bi bi-heart"></i> Like
            </Button>
            <div style={{ display: "inline-block" }}><h3>{likeCount}</h3></div>
            <div>
              {isEditButtonVisible && (
                <Button className="btn btn-primary" onClick={() => console.log('Button clicked')}>My Button</Button>
              )}
            </div>
          </div>
        </div>

        {/* Comments Modal */}
        <Modal show={showCommentsModal} onHide={handleCommentsModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {comments.map((comment) => (
              <div key={comment.id}>
                <p>
                  <strong>{comment.user}:</strong> {comment.text}
                </p>
              </div>
            ))}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default SocialPostCard;