// pages/index.js
"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import academicPostData from "../../mockdata/academicPostData";
import Navbar from "../../components/Navbar";
import SectionSwap from "../components/SectionSwap";
import AcademicPostCard from "../components/AcademicPostCard";

export default function Home() {
  const { data: session } = useSession();
  const initialProducts = academicPostData;

  // State for search input, selected type, and posts
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [posts, setSWPost] = useState([]);

  // Function to filter posts based on search and type
  const filteredProducts = posts.filter((post) => {
    const matchesSearch = post.courseCode
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const matchesType = !selectedType || post.type === selectedType;

    return matchesSearch && matchesType;
  });

  // Add a new post card to the page
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

  const numColumns = 4;
  const itemsPerColumn = Math.ceil(filteredProducts.length / numColumns);

  // Create an array to group items into columns
  const columns = [];
  for (let i = 0; i < numColumns; i++) {
    columns.push(
      filteredProducts.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
    );
  }

  //-----------------------------------------
  useEffect(() => {
    const fetchSW = async () => {
      try {
        const response = await fetch(
          "http://localhost:3500/api/group/getSWs",
          {
            method: "GET"
          }
        );
        if (response.ok) {
          console.log("Fetch all sw info fetch successful");
          const data = await response.json();

          console.log("data: ", data);
          setSWPost(data);
        } else {
          console.error("Fetch post info fetch failed, response: ", response);
        }
      } catch (error) {
        console.log("fetch post info basarisiz, ", error);
      }
    };

    fetchSW();
  }, []);

  //-----------------------------------------

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar for type filtering */}
          <div className="col-md-3"></div>
          <div className="col-md-9" style={{ marginLeft: "-160px" }}>
            {/* Center-align the content */}
            <header className="text-center">
              <h1>Welcome to Bilkonnekt Academic</h1>
              <p>Make a post, find the most!</p>
            </header>

            <div className="search-bar">
              <input
                type="text"
                className="form-control"
                placeholder="Search for posts..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                className="btn btn-primary"
                style={{ marginLeft: "15px" }}
              >
                Search
              </button>
              <button
                className="btn btn-success"
                onClick={openModal}
                style={{
                  maxWidth: "200px",
                  maxHeight: "70px",
                  marginTop: "20px",
                  position: "sticky",
                  top: "480px",
                  marginLeft: "10px",
                }}
              >
                Add Section Swap
              </button>
              <SectionSwap
                showModal={showModal}
                closeModal={closeModal}
                posts={posts}
                setSWPost={setSWPost}
              />
            </div>

            <main style={{ marginTop: "20px" }}>
              {/* Product grid */}
              <div className="product-grid">
                {columns.map((column, columnIndex) => (
                  <div key={columnIndex} className="column">
                    {column.map((post, index) => (
                      <div key={index} className="product-card">
                        <AcademicPostCard
                          writer={post.userId}
                          courseCode={post.courseCode}
                          initialSection={post.currentSection}
                          requestedSection={post.aimedSection}
                        />
                      </div>
                    ))}
                  </div>
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
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .product-card {
          display: flex;
          flex-direction: column;
        }
        .product-card:hover {
          cursor: pointer;
        }

        .sidebar {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
          width: 200px;
          height: 300px;
          margin-top: 160px;

          position: sticky;
          top: 160px;
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
