// pages/index.js
"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";
import productdata from "../../mockdata/productdata.js";

function productInfo(products) {
  return (
    <div>
      <div class="productInfo">
        <h2>Price</h2>
        <p>{products[0].price}</p>
      </div>
      <div class="productInfo">
        <h2>Description</h2>
        <p>{products[0].description}</p>
      </div>
      <div class="productInfo">
        <h2>Seller ID</h2>
        <p>{products[0].sellerid}</p>
      </div>
      <div class="productInfo">
        <h2>Address</h2>
        <p>{products[0].address}</p>
      </div>
      <div class="productInfo">
        <h2>Category</h2>
        <p>{products[0].category}</p>
      </div>
    </div>
  );
}

function imageSpace() {
  return (
    <div>
      <div class="imageSpace">
        <p>Product Image Resides Here</p>
      </div>
    </div>
  );
}

export default function PostPage() {
  const { data: session } = useSession();
  let products = productdata;
  return (
    <div>
      <Navbar />
      <div className="container">
        <header>
          <h1 align="left"> {products[1].title}</h1>
        </header>

        <main>
          <imageSpace>{imageSpace()}</imageSpace>
          <productInfo>{productInfo(products)}</productInfo>
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
