// pages/index.js
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar.jsx";
import { useSession } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
function productInfo(products) {
  return (
    <div className="text-black text-left" >
      <div class="productInfo">
        <h2>Price: {products?.price}$</h2>
        
      </div>
      <div class="productInfo">
        <h2>Description: {products?.description}</h2>
        
      </div>
      <div class="productInfo">
        <h2>Seller: {products?.sellerName} </h2>
        
      </div>
      <div class="productInfo">
        <h2>Address: {products?.address}</h2>
        
      </div>
      <div class="productInfo">
        <h2>Category: {products?.type}</h2>
        
      </div>
    </div>
  );
}

function imageSpace(product) {
  return (
    <div>
      <div class="imageSpace m-1"style={{
            height: "500px", // Set a fixed height for uniformity
            overflow: "hidden", // Hide overflowing content
          }}>

        {product.imageURL && (
          <img
            src={product.imageURL}
            alt="Product Image"
            style={{
              width: "100%", // Ensure the image covers the container width
              objectFit: "cover", // Crop the image while maintaining aspect ratio
              height: "100%",
              maxHeight: "100%", // Ensure the image covers the container height
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
          <div className="card bg-custom1" >
            <div className="row">
              <div className="col">
              <imageSpace class="card m-2" style={{marginLeft:"20px",width:"750px"}}>{imageSpace(product)}</imageSpace>
              </div>
              <div className="col" style={{marginTop:"100px",marginLeft:"-30px"}}>
                <div className="text-white text-left" style={{fontSize: '20px',marginLeft:"10px"}}>Item Information</div>
              <productInfo class="card m-2 "  >{productInfo(product)}</productInfo>
              </div>
            </div>
            
          
          </div>
          
        </main>

        <footer>
          <p>&copy; {new Date().getFullYear()} Our Marketplace</p>
        </footer>

        <style>{`
        .bg-custom1 {
          
          
          background: #0B1356;
          
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

        footer {
          text-align: center;
          margin-top: 20px;
        }
      `}</style>
      </div>
    </div>
  );
}
