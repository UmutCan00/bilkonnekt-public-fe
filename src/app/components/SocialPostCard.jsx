"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from 'next/link';

const SocialPostCard = ({
  id,
  sharer,
  title,
  content,
  type,
  imageURL,
}) => {
  return (
    <>
    <style jsx global>{`
      /* Global styles to remove underlines from links */
      a {
        text-decoration: none;
      }
  `}</style>

    <div className="card bg-white " style={{ width: '400px' }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Sharer: {sharer}</p>
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
        <p className="card-text">Content: {content}</p>
        <div className="card-body">
          <button className="btn btn-primary mr-2">
            <i className="bi bi-chat"></i> Comment
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-heart"></i> Like
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default SocialPostCard;