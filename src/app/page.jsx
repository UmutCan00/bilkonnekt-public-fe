// pages/index.js
"use client";
import React, { useState } from "react";
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
  console.log("session", session);
  console.log("user", session?.user?.username);
  const products = productdata;
  const posts = socialPosts;
  const [searchInput, setSearchInput] = useState("");
  console.log("data", products);
  const limitedData = products.slice(0, 5);
  
  return (
    <div>
      <Navbar />
      <div className="container-fluid home">
        <header className="text-center">
          <h1>Welcome to Bilkonnekt Marketplace</h1>
          <p>Find great deals on items near you</p>
        </header>
        

        <div className="search-bar m-2 ">
          <input
            type="text"
            className="form-control"
            placeholder="Search for items..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="btn btn-primary ">Search</button>
        </div>

          <main>
            <div className="container-fluid card bg-custom1 m-2"> 
              <div className="intro-card ">
                <h1>Go to Marketplace</h1>
                  <Link href="/marketplace">
                    <button className="btn btn-primary">  Search</button>
                  </Link>
              </div>

              

              <div className="list">
                { 
                  
                  limitedData.map(
                    (
                      product
                      // .map for loop gibi içindeki her obje için alttaki fonksiyonu çağırır
                    ) => (
                      <SaleProductCard
                        key={product.uuid}
                        seller={product.sellerid}
                        title={product.title}
                        price={product.price}
                        location={product.address}
                        type={product.type}
                        description={product.description}
                      />
                    )
                  )}
              </div>
            </div>  

            <div className="container-fluid card bg-custom1 m-2">
              <div className="intro-card ">
                <h1>Go to Bilkent Social</h1>
                <button className="btn btn-primary">  Search</button>
              </div>

              <div className="list">
                {posts.map(
                  (
                    post,
                    index
                    // .map for loop gibi içindeki her obje için alttaki fonksiyonu çağırır
                  ) => (
                    
                    <SocialPostCard
                      key = {index}
                      title={post.title}
                      sharer={post.sharer}
                      content={post.content}
                    />
                   
                  )
                )}
              </div>
            </div>  

            <div className="container-fluid card bg-custom1 m-2">
              <div className="intro-card ">
                <h1>Go to Bilkent Academic</h1>
                <button className="btn btn-primary">  Search</button>
              </div>

            </div>  

            <div className="container-fluid card bg-custom1 m-2">
              <div className="intro-card ">
                <h1>Go to Lost & Found</h1>
                <button className="btn btn-primary">  Search</button>
              </div>

            </div>  

          </main>

          <footer>
            <p>&copy; {new Date().getFullYear()} Our Marketplace</p>
          </footer>

          <style>{`
          .home {
            padding-left: 80px;
            padding-right: 80px;
          }

          div {
            padding: 10px; 
          }
          
          .bg-custom1 {
            background-color: #89cff0; 
          }

          .intro-card {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            margin-top: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: white;
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
            margin-top: 20px;
          }

          img {
            max-width: 100%;
            height: auto;
          }

          footer {
            text-align: center;
            margin-top: 20px;
          }
        `}</style>
      </div>
    </div>
  );
}
