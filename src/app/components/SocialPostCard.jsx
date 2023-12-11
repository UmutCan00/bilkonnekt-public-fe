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
    <div className="card bg-white ">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Sharer: {sharer}</p>
        <p className="card-text">Content: {content}</p>
        <div className="card-body">
          <button className="btn btn-primary mr-2">
            <i className="bi bi-eye"></i> <Link href={`/feed/${id}`}>
              See the Post
            </Link></button>
          <button className="btn btn-primary mr-2">
            <i className="bi bi-chat"></i> Comment
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-heart"></i> Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialPostCard;