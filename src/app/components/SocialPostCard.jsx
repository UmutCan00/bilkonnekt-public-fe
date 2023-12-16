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
  // Dummy comments data (replace with actual comments data)
  const comments = [
    { id: 1, text: 'Great post!', user: 'User1' },
    { id: 2, text: 'Interesting thoughts.', user: 'User2' },
    // Add more comments as needed
  ];

  // Add a new product card to the page
  // Define a state variable to control the modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to handle the modal open
  const openModal = () => {
    setShowModal(true);
  };

  // Function to handle the modal close
  const closeModal = () => {
    setShowModal(false);
  };

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  const handleButtonClick = (e) => {
    e.stopPropagation();
    openModal(); // Open the modal
  };

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
          <div style={{ display: 'flex' }}>
          <h5 className="card-title">{title}</h5>
            <div style={{ marginLeft: '230px', display: 'flex', flexDirection: 'row' }}>
              {isEditButtonVisible && (
                <>
                  <Button className="btn btn-primary" onClick={ handleButtonClick}>Edit</Button>
                  <Button className="btn btn-danger m-2"
                          onClick={() => console.log('Delete button clicked')}> <i className="bi bi-x"></i> </Button>
                </>
              )}
              <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="title">
                      <Form.Label>Header</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={title}
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="description">
                      <Form.Label>Content</Form.Label>
                      <Form.Control
                        as="textarea"
                        defaultValue={content}
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                      />
                    </Form.Group>

                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" >
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
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
          <Link href={`/feed/${id}`} passHref>
              <Button
                className="btn btn-primary mr-2"
                variant="info"
              >
                <i className="bi bi-chat"></i> See Comments
              </Button>
          </Link>
            <Button className="btn btn-primary"
              onClick={likeFunc}
            >
              <i className="bi bi-heart"></i> Like
            </Button>
            <div style={{ display: "inline-block" }}><h3>{likeCount}</h3></div>
          </div>
        </div>

        
      </div>
      
    </>
  );
};

export default SocialPostCard;