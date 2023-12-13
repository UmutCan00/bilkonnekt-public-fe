// pages/index.js
"use client";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
//import postdata from "../mockdata/postdata"; TODO delete

import Navbar from "../components/Navbar";
import SocialPostCard from "../components/SocialPostCard";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { v4 } from "uuid";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export default function Home() {
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const [productdata, setproductdata] = useState([]);
  const [initialProducts, setinitialProducts] = useState([]);

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  // State for search input, selected type, and products
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [products, setProducts] = useState(initialProducts);
  console.log("products: ", products);
  const [posts, setPosts] = useState([]);

  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductAddress, setNewProductAddress] = useState("");
  const [newProductType, setNewProductType] = useState("selling");
  const [newProductDescription, setNewProductDescription] = useState("");
  // Function to filter products based on search and type
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      post.content.toLowerCase().includes(searchInput.toLowerCase());

    const matchesType = !selectedType || post.type === selectedType;

    return matchesSearch && matchesType;
  });

  // Add a new product card to the page
  // Define a state variable to control the modal visibility
  const [showModal, setShowModal] = useState(false);

  // Define state variables for the input fields
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostType, setNewPostType] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  // Function to handle the modal open
  const openModal = () => {
    setShowModal(true);
  };

  // Function to handle the modal close
  const closeModal = () => {
    setShowModal(false);
  };

  let imgURL = "foo";
  let uploadedImageURL = "false";

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/social/getSocialPosts",
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
        console.log(data);
        setPosts(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  // Function to handle the form submission
  const handleSubmit = async () => {
    try {
      uploadedImageURL = await uploadImage();
    } catch (error) {
      console.log("firebase error: ", error);
    }
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const uploadImage = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        return getDownloadURL(imageRef);
      })
      .then((downloadURL) => {
        uploadedImageURL = downloadURL;
        console.log("Image URL:", uploadedImageURL);
        alert("Image uploaded");
        return downloadURL;
      })
      .then(() => {
        fetch("http://localhost:3500/api/social/createSocialPost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: newProductTitle,
            content: newProductDescription,
            imageURL: uploadedImageURL,
          }),
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
    closeModal();
  };

  const numColumns = 4;
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
          <div className="col-md-3">
            <div className="sidebar">
              <div>
                <h3>Filter by Type</h3>
                <ul>
                  <li>
                    <button onClick={() => setSelectedType("")}>All</button>
                  </li>
                  <li>
                    <button onClick={() => setSelectedType("feed")}>
                      Feed
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setSelectedType("clubPage")}>
                      Club Page
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <button
              className="btn btn-success"
              onClick={openModal}
              style={{
                maxWidth: "100px",
                maxHeight: "70px",
                marginTop: "20px",
              }}
            >
              Share
            </button>
            <Modal show={showModal} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="title">
                    <Form.Label>Header</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      value={newProductTitle}
                      onChange={(e) => setNewProductTitle(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter description"
                      value={newProductDescription}
                      onChange={(e) => setNewProductDescription(e.target.value)}
                    />
                  </Form.Group>
                </Form>
                <input
                  type="file"
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                  Share
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="col-md-9" style={{ marginLeft: "-160px" }}>
            {/* Center-align the content */}
            <header className="text-center">
              <h1>Welcome to Bilkonnekt Social</h1>
              <p>Don&apos;t Miss Anything on Campus</p>
            </header>

            <div className="search-bar">
              <input
                type="text"
                className="form-control"
                placeholder="Search for posts..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="btn btn-primary">Search</button>
            </div>

            <main style={{ marginTop: "20px" }}>
              {/* Social post container */}
              <div className="social-post-container">
                {filteredPosts.map((post, index) => (
                  <Link key={index} href={`/feed/${post._id}`} passHref>
                    <div className="socialpost-card">
                      <SocialPostCard
                        id={post._id}
                        sharer={post.publisherId}
                        title={post.title}
                        type={null}
                        content={post.content}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </main>

            <footer className="text-center mt-4">
              <p>&copy; {new Date().getFullYear()} Bilkonnekt Marketplace</p>
            </footer>
          </div>
        </div>
      </div>
      <style jsx>{`
        a {
          text-decoration: none;
        }

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
      `}</style>
    </div>
  );
}
