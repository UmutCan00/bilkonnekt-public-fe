// pages/index.js
"use client";
import { useRouter } from 'next/navigation';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import postdata from "../../mockdata/postdata";
import Navbar from "../../components/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Home = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();
  //const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const token = session?.backendTokens?.accessToken;

  const [post, setPost] = useState([]);
 
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      post.content.toLowerCase().includes(searchInput.toLowerCase());

    const matchesType = !selectedType || post.type === selectedType;

    return matchesSearch && matchesType;
  });
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
          console.error(
            "Fetch post info fetch failed, response: ",
            response
          );
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

    // Close the modal after adding the comment
    handleAddCommentModalClose();
  };
  console.log("post.url: ",post.imageURL)
  console.log("post.title: ",post.title)
  const SocialPostCard = ({ sharer, title, type, content,  imageURL, comments, }) => (
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
          <p className="card-text">Sharer: {sharer}</p>
          <img
            src={post.imageURL}
            alt="Product Image"
            style={{
              width: "100%", // Ensure the image covers the container width
              objectFit: "cover", // Crop the image while maintaining aspect ratio
              maxHeight: "100%", // Ensure the image covers the container height
            }}
          />
          <p className="card-text">Content: {content}</p>
          <div className="card-body">
            <Button
              className="btn btn-primary mr-2"
              variant="info"
              onClick={handleAddCommentModalOpen}
            >
              <i className="bi bi-chat-dots"></i> Add Comment
            </Button>
            <button className="btn btn-primary">
              <i className="bi bi-heart"></i> Like
            </button>

            <div className="comments-section" style={{ backgroundColor: 'white' }}>
              <h6>Comments</h6>
              {comments.map((comment) => (
                <div key={comment.id}>
                  <p>
                    <strong>{comment.user}:</strong> {comment.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Comment Modal */}
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
                  <Button variant="primary" onClick={handleAddComment}>
                    Add Comment
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>

          </div>
        </div>
      </div>
    </>
  );

  const numColumns = 1;
  const itemsPerColumn = Math.ceil(filteredPosts.length / numColumns);

  // Create an array to group items into columns
  const columns = [];
  for (let i = 0; i < numColumns; i++) {
    columns.push(
      filteredPosts.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
    );
  }
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
            <main style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Social post container */}
              <div className="social-post-container">
                { // Conditionally render SocialPostCard if post is not null
                  
                
                <div className="social-post-container">
                    <div className="socialpost-card">
                      <SocialPostCard
                        imageURL={post.imageURL}
                        id={post._id}
                        sharer={post.publisherId}
                        title={post.title}
                        type={null}
                        content={post.content}
                        comments={[
                          { id: 1, text: 'Great post!', user: 'User1' },
                          { id: 2, text: 'Interesting thoughts.', user: 'User2' },
                          // Add more comments as needed
                        ]}
                      />
                      
                    </div>
              </div>
                }
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
