// pages/index.js
"use client";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import postdata from "../../mockdata/postdata";
import Navbar from "../../components/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SocialPostCard = ({
  sharer,
  sharerName,
  title,
  type,
  content,
  imageURL,
  comments,
  handleAddCommentModalOpen,
  handleAddCommentModalClose,
  handleAddComment,
  newComment,
  setNewComment,
  showAddCommentModal,
  isAnonymous,
  setIsAnonymous,
}) => {

  
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;

  const currentuserid = session?.user?._id;
  const isEditButtonVisible = (currentuserid == sharer);

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

    // Add a new product card to the page
  // Define a state variable to control the modal visibility
  const [showEditCommentModal, setShowEditCommentModal] = useState(false);

  // Function to handle the modal open
  const openEditCommentModal = () => {
    setShowEditCommentModal(true);
  };

  // Function to handle the modal close
  const closeEditCommentModal = () => {
    setShowEditCommentModal(false);
  };

  const [newEditedComment, changeComment] = useState("");

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
    <div className="card bg-white" style={{ width: "400px" }}>
      <div className="card-body">
      <div style={{ display: 'flex' }}>
        <h5 className="card-title">{title}</h5>
        <div style={{ marginLeft: '230px', display: 'flex', flexDirection: 'row' }}>
          
          {isEditButtonVisible && (
            <>
              <Button className="btn btn-primary" onClick={ openModal}>Edit</Button>
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
        
        <p className="card-text">Sharer: {sharer}</p>
        <img
          src={imageURL}
          alt="Product Image"
          style={{
            width: "100%",
            objectFit: "cover",
            maxHeight: "100%",
          }}
        />
        <p className="card-text">Content: {content}</p>
        <div className="card-body">
          <div style={{ display: 'flex', flexDirection: 'row' }}>  
            <Button
              className="btn btn-primary mr-2"
              variant="info"
              onClick={handleAddCommentModalOpen}
            >
              <i className="bi bi-chat-dots"></i> Add Comment
            </Button>
            <Button className="btn btn-primary"
              onClick={likeFunc}
            >
              <i className="bi bi-heart"></i> Like
            </Button>
          </div>
          <div
            className="comments-section"
            style={{ backgroundColor: "white" }}
          >
            <h6>Comments</h6>
            {comments.map((comment) => (
              <div key={comment.id} 
                  style={{ display: 'flex', flexDirection: 'row' }}>  
                <p>
                  <strong>{comment.commenterName}:</strong> {comment.description} 
                  {' '}
                  {currentuserid ==comment.commenterId && (
                    <>
                      <span
                        style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={openEditCommentModal}
                      >
                        Edit Comment
                      </span>
                      {' '}
                      <span
                        style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                        // onClick={handleDeleteComment}
                      >
                        Delete Comment
                      </span>
                    </>
                  )}
                  
                </p>
                <Modal show={showEditCommentModal} onHide={closeEditCommentModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Comment</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="title">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={comment.description}
                          value={newEditedComment}
                          onChange={(e) => changeComment(e.target.value)}
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
            ))}
          </div>
        </div>
      </div>
    </div>
    <Modal show={showAddCommentModal} onHide={handleAddCommentModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="newComment">
            <Form.Control
              as="textarea"
              placeholder="Type your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="Anonymous">
            <Form.Check
              type="checkbox"
              label="Make my post Anonymous"
              checked={isAnonymous}
              onChange={(e) => {setIsAnonymous(e.target.checked); console.log("isAnon: ", isAnonymous)}}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  </>
  );
};

const Home = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();
  //const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const token = session?.backendTokens?.accessToken;

  const [post, setPost] = useState([]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      post.content.toLowerCase().includes(searchInput.toLowerCase());

    const matchesType = !selectedType || post.type === selectedType;

    return matchesSearch && matchesType;
  });

  const fetchComments = async () => {
    try {
      const incomingComments = await fetch(
        "http://localhost:3500/api/social/getPostComments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            postId: params.postId,
          }),
        }
      );
      const data = await incomingComments.json();
      console.log("Comment data: ", data)
      setComments(data);
      console.log("comments: ", comments)
    } catch (error) {
      console.log("fetch comments basarisiz: ", error)
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const postId = params.postId;

      try {
        const response = await fetch(
          "http://localhost:3500/api/social/getSingleSocialPost",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              postID: postId,
            }),
          }
        );

        if (response.ok) {
          console.log("Fetch post info fetch successful");
          const data = await response.json();

          console.log("data: ", data);
          setPost(data);
        } else {

          console.error("Fetch post info fetch failed, response: ", response);
        }
      } catch (error) {
        console.log("fetch post info basarisiz, ", error);
      }
      // Use try-catch to handle errors during data fetching
      try {
        const post = await getPostById(postId);
        //setPost(post);
        //setComments(post.comments || []);
        //setLikes(post.likes || []);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
    fetchComments();
  }, [params.postId, token]); // Add params.postId as a dependency

  const getPostById = async (postId) => {
    // Simulate fetching data from a database or API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = postdata.find((post) => post.id == postId);
        if (post) {
          resolve(post);
        } else {
          //reject(new Error("Post not found"));
        }
      }, 1000); // Simulating an asynchronous delay (replace with actual async fetch)
    });
  };

  const [showAddCommentModal, setShowAddCommentModal] = useState(false);

  const handleAddCommentModalOpen = () => setShowAddCommentModal(true);
  const handleAddCommentModalClose = () => setShowAddCommentModal(false);

  const handleAddComment = () => {
    // Perform the action of adding a comment here

    console.log('Adding comment:', newComment);
    console.log("params: ", params);
    try {
      fetch("http://localhost:3500/api/social/createComment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            postId: params.postId,
            description: newComment,
            isAnonymous: isAnonymous
          }),
        });
    } catch (error) {
      console.log("error: ", error)
    }
    // Close the modal after adding the comment
    handleAddCommentModalClose();
    window.location.reload();
  };
  console.log("post.url: ",post.imageURL)
  console.log("post.title: ",post.title)
  


  const numColumns = 1;
  const itemsPerColumn = Math.ceil(filteredPosts.length / numColumns);

  // Create an array to group items into columns
  const columns = [];
  for (let i = 0; i < numColumns; i++) {
    columns.push(
      filteredPosts.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
    );
  }
  const goBack = () => {
    router.push("/social"); 
  };



  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar for type filtering */}
          <div className="col-md-9" style={{ marginLeft: "160px" }}>
            {/* Center-align the content */}
            <header className="text-center">
              <h1>Welcome to Bilkonnekt Social</h1>
              <p>Don&apos;t Miss Anything on Campus</p>
            </header>
            <button
              className="btn btn-dark"
              onClick={goBack}
              style={{
                maxWidth: "100px",
                maxHeight: "70px",
                marginTop: "20px",
              }}
            >
              Back
            </button>
            <main
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Social post container */}
              <div className="social-post-container">
                <div className="social-post-container">
                  {post && (
                    <div className="socialpost-card">
                      <SocialPostCard
                        imageURL={post.imageURL}
                        id={post._id}
                        sharer={post.publisherId}
                        sharerName={post.publisherName}
                        title={post.title}
                        type={null}
                        content={post.content}

                        comments={comments}
                        handleAddCommentModalOpen={handleAddCommentModalOpen}
                        handleAddCommentModalClose={handleAddCommentModalClose}
                        handleAddComment={handleAddComment}
                        newComment={newComment}
                        setNewComment={setNewComment}
                        showAddCommentModal={showAddCommentModal}
                        setIsAnonymous={setIsAnonymous}
                        isAnonymous={isAnonymous}
                      />
                    </div>
                  )}
                </div>
              </div>
            </main>

            <footer className="text-center mt-4">
              <p>&copy; {new Date().getFullYear()} Bilkonnekt Marketplace</p>
            </footer>
          </div>
        </div>
      </div>
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .social-post-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .socialpost-card {
          width: 100%;
          max-width: 600px;
          margin-bottom: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .socialpost-card:hover {
          cursor: pointer;
        }

        .sidebar {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
          width: 200px;
          height: 300px;
          margin-top: 160px;
        }

        .sidebar h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
        }

        .sidebar li {
          margin-bottom: 5px;
        }

        .sidebar button {
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          padding: 0;
          font-size: 14px;
        }

        .sidebar button:hover {
          text-decoration: underline;
        }

        .search-bar {
          text-align: center;
          margin-top: 20px;
        }

        .comments-section {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default Home;
