"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const SaleProductCard = ({
  seller,
  title,
  price,
  location,
  description,
  type,
  imageURL,
  productid,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const [isHovered, setIsHovered] = useState(false);
  const handleRemove = () => {
    if (seller === session?.user?._id) {
      console.log("Product ID to be removed:", productid);
      // Handle remove operation
      console.log("Remove button clicked!");
    }
  };

  const handleContactSeller = async (sellerDetails) => {
    try {
      const response = await fetch(
        "http://localhost:3500/api/dialog/createDialog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sellerDetails.token}`,
          },
          body: JSON.stringify({
            itemId: sellerDetails.productid,
            sellerId: sellerDetails.seller,
          }),
        }
      );

      if (response.ok) {
        console.log("Created!");
        router.push("/message");
      } else {
        console.error("Failed to create dialog");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="card mb-3 position-relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {seller === session?.user?._id && (
        <button
          className={`btn btn-danger position-absolute top-0 end-0 m-2 ${
            isHovered ? "visible" : "invisible"
          }`}
          onClick={handleRemove}
        >
          <i className="bi bi-x"></i>
        </button>
      )}
      {/* Display the cropped image */}
      {imageURL && (
        <div
          className="card-img-top"
          style={{
            height: "200px", // Set a fixed height for uniformity
            overflow: "hidden", // Hide overflowing content
          }}
        >
          <img
            src={imageURL}
            alt="Product Image"
            style={{
              width: "100%", // Ensure the image covers the container width
              objectFit: "cover", // Crop the image while maintaining aspect ratio
              maxHeight: "100%", // Ensure the image covers the container height
            }}
          />
        </div>
      )}

      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Price: ${price}</p>
        <p className="card-text">Location: {location}</p>
        <p className="card-text">Seller: {seller}</p>
        <p className="card-text">Type: {type}</p>
        <p className="card-text">Description: {description}</p>
        {/* Assign the function to the onClick event */}
        <button className="btn btn-primary" onClick={handleContactSeller}>
          Contact Seller
        </button>
      </div>
    </div>
  );
};

export default SaleProductCard;
