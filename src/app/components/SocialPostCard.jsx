"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const SocialPostCard = ({
  sharer,
  title,
  content,
  type,
}) => {
  return (
    <div className="card bg-white ">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Type: {type}</p>
        <p className="card-text">Sharer: {sharer}</p>
        <p className="card-text">Content: {content}</p>
        <button className="btn btn-primary">See the Post</button>
      </div>
    </div>
  );
};

export default SocialPostCard;