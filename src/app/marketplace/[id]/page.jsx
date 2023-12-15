// pages/index.js
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar.jsx";
import { useSession } from "next-auth/react";

function productInfo(products) {
  return (
    <div>
      <div class="productInfo">
        <h2>Price</h2>
        <p>{products?.price}</p>
      </div>
      <div class="productInfo">
        <h2>Description</h2>
        <p>{products?.description}</p>
      </div>
      <div class="productInfo">
        <h2>Seller ID</h2>
        <p>{products?.sellerid}</p>
      </div>
      <div class="productInfo">
        <h2>Address</h2>
        <p>{products?.address}</p>
      </div>
      <div class="productInfo">
        <h2>Category</h2>
        <p>{products?.type}</p>
      </div>
    </div>
  );
}

function imageSpace(product) {
  return (
    <div>
      <div class="imageSpace">
        {product.imageURL && (
          <img
            src={product.imageURL}
            alt="Product Image"
            style={{
              width: "100%",
              height: "100%", // Ensure the image covers the container width
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function PostPage({ params }) {
  const { data: session } = useSession();
  const [product, setProduct] = useState({});
  const token = session?.backendTokens?.accessToken;
  useEffect(() => {
    const fetchSinglePostData = async (id) => {
      try {
        const response = await fetch(
          "http://localhost:3500/api/product/getSingleProductById",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productId: id,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProduct(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSinglePostData(params.id);
  }, [params.id, token]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <header>
          <h1 align="left"> {product.title}</h1>
        </header>

        <main>
          <imageSpace>{imageSpace(product)}</imageSpace>
          <productInfo>{productInfo(product)}</productInfo>
        </main>

        <footer>
          <p>&copy; {new Date().getFullYear()} Our Marketplace</p>
        </footer>

        <style>{`
        .container {
          display:block;
          margin: 0 auto;
          background: #aaa;
          height: 800px
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

        .imageSpace{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1000px;
          height: 500px;
          float:left;
          color: black;          
          border-radius: 2px;          
          background: white;
        }

        .productInfo {
          
          width: 300px;
          margin: 0px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: left;
          margin-left: auto;
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
