// pages/index.js
"use client";
// pages/index.js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import productdata from "../mockdata/productdata";
import Navbar from "../components/Navbar";
import SaleProductCard from "../components/SaleProductCard";

export default function Home() {
  const { data: session } = useSession();
  const products = productdata;

  // State for search input and selected type
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Function to filter products based on search and type
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.description.toLowerCase().includes(searchInput.toLowerCase());

    const matchesType = !selectedType || product.type === selectedType;

    return matchesSearch && matchesType;
  });
  const numColumns = 4;
  const itemsPerColumn = Math.ceil(filteredProducts.length / numColumns);

  // Create an array to group items into columns
  const columns = [];
  for (let i = 0; i < numColumns; i++) {
    columns.push(
      filteredProducts.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
    );
  }

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row">
        {/* Sidebar for type filtering */}
        <div className="col-md-3 sidebar">
          <div>
            <h3>Filter by Type</h3>
            <ul>
              <li>
                <button onClick={() => setSelectedType("")}>All</button>
              </li>
              <li>
                <button onClick={() => setSelectedType("selling")}>
                  Selling
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedType("donating")}>
                  Donating
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedType("borrowing")}>
                  Borrowing
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <header className="text-center">
            <h1>Welcome to Bilkonnekt Marketplace</h1>
            <p>Find great deals on items near you</p>
            <div className="search-bar">
              <input
                type="text"
                className="form-control"
                placeholder="Search for items..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="btn btn-primary">Search</button>
            </div>
          </header>

          <main>
            {/* Product grid */}
            <div className="product-grid">
              {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="column">
                  {column.map((product, index) => (
                    <div key={index} className="product-card">
                      <SaleProductCard
                        seller={product.sellerid}
                        title={product.title}
                        price={product.price}
                        location={product.address}
                        type={product.type}
                        description={product.description}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </main>

          <footer className="text-center mt-4">
            <p>&copy; {new Date().getFullYear()} Bilkonnekt Marketplace</p>
          </footer>
        </div>
      </div>
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .product-card {
          display: flex;
          flex-direction: column;
        }
        .product-card:hover {
          cursor: pointer;
        }

        .sidebar {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
          width: 200px;
          margin-top: 130px;
          height: 300px;
        }

        .sidebar h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
        }

        .sidebar li {
          margin-bottom: 5px;
        }

        .sidebar button {
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          padding: 0;
          font-size: 14px;
        }

        .sidebar button:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
