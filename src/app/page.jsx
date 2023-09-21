// pages/index.js
"use client";
import React from "react";
import Navbar from "./components/Navbar";
import { useSession } from "next-auth/react";
// A simple ProductCard component for displaying product information
function ProductCard({ image, title, price, location }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>Price: ${price}</p>
      <p>Location: {location}</p>
      <button>Contact Seller</button>
    </div>
  );
}

export default function Home() {
  const { data: session } = useSession();
  console.log("session", session);
  console.log("user", session?.user?.username);
  return (
    <div className="container">
      <Navbar />
      <header>
        <h1>Welcome to Our Marketplace</h1>
        <p>Find great deals on items near you</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for items..." />
          <button>Search</button>
        </div>
      </header>

      <main>
        <section className="product-list">
          {/* Example ProductCards */}
          <ProductCard
            image="product1.jpg"
            title="Product Title 1"
            price="50"
            location="City, State 1"
          />
          <ProductCard
            image="product2.jpg"
            title="Product Title 2"
            price="75"
            location="City, State 2"
          />
          {/* Add more ProductCard components as needed */}
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Our Marketplace</p>
      </footer>

      <style>{`
        .container {
          max-width: 960px;
          margin: 0 auto;
          padding: 20px;
        }

        header {
          text-align: center;
          padding: 20px 0;
        }

        .search-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }


        button {
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          cursor: pointer;
        }

        main {
          text-align: center;
        }

        .product-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          margin-top: 20px;
        }

        .product-card {
          width: 300px;
          margin: 20px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
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
  );
}
