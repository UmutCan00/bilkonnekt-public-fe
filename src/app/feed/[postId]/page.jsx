// pages/index.js
"use client";
import { useRouter } from 'next/navigation';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import postdata from "../../mockdata/postdata";
import Navbar from "../../components/Navbar";
import SocialPostCard from "../../components/SocialPostCard";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Home({params}) {
  const { data: session } = useSession();
const router = useRouter()
  const [post, setPost] = useState(null);
<<<<<<< HEAD
  const token = session?.backendTokens?.accessToken;
=======
  const [newComment, setNewComment] = useState('');

>>>>>>> parent of 02e1a82 (Merge branch 'main' into social_page_feed)
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
                postID: postId
              }),
            }
          );
          if (response.ok) {
            console.log("Fetch post info fetch successful");
            const data = await response.json();
            console.log("data: ",data)
          } else {
            console.error("Fetch post info fetch failed");
          }
      } catch (error) {
        console.log("fetch post info basarisiz") 
      }
      const postId = params.postId;

      // Use try-catch to handle errors during data fetching
      try {
        const post = await getPostById(postId);
        setPost(post);
      } catch (error) {
        console.error("Error fetching post:", error);
      }  
    }
      }
    };

    fetchPost();
  }, [params.postId]); // Add params.postId as a dependency

  const getPostById = async (postId) => {
    // Simulate fetching data from a database or API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = postdata.find((post) => post.id == postId);
        if (post) {
          resolve(post);
        } else {
          reject(new Error("Post not found"));
        }
      }, 1000); // Simulating an asynchronous delay (replace with actual async fetch)
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar for type filtering */}
          <div className="col-md-9" style={{ marginLeft: "-160px" }}>
            {/* Center-align the content */}
            <header className="text-center">
              <h1>Welcome to Bilkonnekt Social</h1>
              <p>Don&apos;t Miss Anything on Campus</p>
            </header>

            <main style={{ marginTop: "20px" }}>
              {/* Social post container */}
              <div className="social-post-container">
              {post && ( // Conditionally render SocialPostCard if post is not null
                  <div key={post.index} className="socialpost-card">
                    <SocialPostCard
                      sharer={post.sharer}
                      title={post.title}
                      type={post.type}
                      content={post.content}
                    />
                  </div>
                )}
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
      `}</style>
    </div>
  );
}