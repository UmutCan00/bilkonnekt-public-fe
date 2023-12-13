"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from 'next/link';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const SocialPostCard = ({
  id,
  sharer,
  title,
  content,
  type,
  imageURL,
}) => {
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const handleCommentsModalOpen = () => setShowCommentsModal(true);
  const handleCommentsModalClose = () => setShowCommentsModal(false);

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



    <div className="card bg-white " style={{ width: '400px' }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Sharer: {sharer}</p>
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
        <p className="card-text">Content: {content}</p>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Sharer: {sharer}</p>
          <p className="card-text">Content: {content}</p>
          <div className="card-body">
            <Button
              className="btn btn-primary mr-2"
              variant="info"
              onClick={handleCommentsModalOpen}
            >
              <i className="bi bi-chat"></i> See Comments
            </Button>
            <button className="btn btn-primary">
              <i className="bi bi-heart"></i> Like
            </button>
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