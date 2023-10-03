"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const SaleProductCard = ({
  seller,
  title,
  price,
  location,
  description,
  type,
}) => {
  return (
    <div className="card mb-3">
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
