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
}) => {
  return (
    <>

      <style jsx global>{`
        /* Global styles to remove underlines from links */
        a {
          text-decoration: none;
        }
      `}</style>

      <div className="card bg-white" style={{ width: '400px' }}>
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
              height: "200px", // Set a fixed height for uniformity
              overflow: "hidden", // Hide overflowing content
            }}
          />
        </div>
      )}
          <p className="card-text">Content: {content}</p>
          <div className="card-body">
            <Button
              className="btn btn-primary mr-2"
              variant="info"
              onClick={handleCommentsModalOpen}
            >
              <i className="bi bi-chat"></i> See Comments
            </Button>
            <button className="btn btn-primary">
              <i className="bi bi-heart"></i> Like
            </button>
          </div>

        </div>
      </div>
    </div>
    </>
  );
};

export default SocialPostCard;