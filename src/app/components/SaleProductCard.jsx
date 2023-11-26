"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";

const SaleProductCard = ({
  seller,
  title,
  price,
  location,
  description,
  type,
  imageURL, // Add imageURL as a prop
}) => {
  return (
    <div className="card mb-3">
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
        <button className="btn btn-primary">Contact Seller</button>
      </div>
    </div>
  );
};

export default SaleProductCard;
