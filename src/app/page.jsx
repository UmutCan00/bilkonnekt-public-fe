// pages/index.js
"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";
import { useSession } from "next-auth/react";
import productdata from "./mockdata/productdata";
import socialPosts from "./mockdata/socialPosts";
import SaleProductCard from "../app/components/SaleProductCard";
import SocialPostCard from "../app/components/SocialPostCard";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  console.log("session", session);
  console.log("user", session?.user?.username);
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
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
        setPosts([data[0], data[1], data[2],data[3]]);
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
  console.log("pro", products);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3500/api/product/getProducts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const re = await response.json();
          setProducts(re.slice(0, 4)); // Update products too
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [token]); // Fetch data only when token changes

  return (
    <div>
      <Navbar />
      <div className="container-fluid home">

        
        <header  className=" card text-center mx-auto titleColor" style={{ maxWidth:"500px" }}>
          <h1>Welcome to Bilkonnekt </h1>
          <p>Your access to all things Bilkent.</p>
        </header>

        <main>

        <div class="row">
            <div class="col">
            <div className="container-fluid card bg-custom1 ">
              <div>

              </div>
              
              <Link href="/marketplace">
                <button className="btn btn-primary m-2"> Go to Marketplace </button>
              </Link>
              

            <div className="list" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} >
  {products.map((product, index) => (
    <div key={index} className="product-card">
      <SaleProductCard
        seller={product.sellerid}
        sellerName={product.sellerName}
        productid={product._id}
        title={product.title}
        price={product.price}
        location={product.address}
        type={product.type}
        description={product.description}
        imageURL={product.imageURL}
      />
    </div>
  ))}
</div>
          </div>
            </div>
            <div class="col">
            <div className="container-fluid card bg-custom1 ">
           
              
              <Link href="/social">
                <button className="btn btn-primary m-2"> Go to Bilkent Social</button>
              </Link>
            

            {/* Social post container */}
            <div className="list" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} >
            {posts.map((post, index) => (
            <Link key={index} href={`/feed/${post._id}`} passHref>
            <div className="socialpost-card" >
            <SocialPostCard
            id={post._id}
            sharer={post.publisherId}
            title={post.title}
            type={null}
            content={post.content}
            imageURL={post.imageURL}
            />
            </div>
            </Link>
            ))}
            </div>

          </div>
            </div>
            <div class="card bg-info d-flex flex-row justify-content-center align-items-center m-2" style={{ marginLeft:"10px" }}>
            <div class="col">
            
              
              <Link href="/academic">
                <button className="btn btn-primary">Go to Bilkent Academic</button>
              </Link>
            
            </div>
            <div class="col">
            
              <Link href="/lostfound">
                <button className="btn btn-primary">Go to Lost & Found</button>
              </Link>
            
            </div>
            <div class="col">
            
              <Link href="/todayinbilkent">
                <button className="btn btn-primary">Go to Today in Bilkent</button>
              </Link>
            
            </div>
            </div>
            </div>
          
        </main>

        <footer>
          <p>
            &copy; {new Date().getFullYear()} Bilkonnekt. A Social Marketplace
          </p>
        </footer>

        <style>{`
          .home {
            padding-left: 80px;
            padding-right: 80px;
          }
          
          .bg-custom1 {
            background-color: #89cff0; 
          }

          .intro-card {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            margin-top: 20px;
            
            
          }

          .search-bar {
            text-align: center;
            margin-top: 20px;
          }

          main {
            text-align: center;
          }

          .list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            
          }

          img {
            max-width: 100%;
            height: auto;
          }
          
          footer {
            text-align: center;
            margin-top: 20px;
          }
          .titleColor{
            background-color: #add8e6;
          }
        `}</style>
      </div>
    </div>
  );
}
