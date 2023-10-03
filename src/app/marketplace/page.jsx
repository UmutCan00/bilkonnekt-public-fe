// pages/index.js
"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import productdata from "../mockdata/productdata";
import Navbar from "../components/Navbar";
import SaleProductCard from "../components/SaleProductCard";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Home() {
  const { data: session } = useSession();
  const initialProducts = productdata;

  // State for search input, selected type, and products
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [products, setProducts] = useState(initialProducts);

  // Function to filter products based on search and type
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.description.toLowerCase().includes(searchInput.toLowerCase());

    const matchesType = !selectedType || product.type === selectedType;

    return matchesSearch && matchesType;
  });

  // Add a new product card to the page
  // Define a state variable to control the modal visibility
  const [showModal, setShowModal] = useState(false);

  // Define state variables for the input fields
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductAddress, setNewProductAddress] = useState("");
  const [newProductType, setNewProductType] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");

  // Function to handle the modal open
  const openModal = () => {
    setShowModal(true);
  };

  // Function to handle the modal close
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle the form submission
  const handleSubmit = () => {
    // Create a new product object with the entered values
    const newProduct = {
      sellerid: "new-seller-id",
      title: newProductTitle,
      price: parseFloat(newProductPrice),
      address: newProductAddress,
      type: newProductType,
      description: newProductDescription,
    };

    // Add the new product to the products array
    setProducts([...products, newProduct]);

    // Close the modal
    closeModal();
  };

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
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar for type filtering */}
          <div className="col-md-3">
            <div className="sidebar">
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
            <button
              className="btn btn-success"
              onClick={openModal}
              style={{
                maxWidth: "100px",
                maxHeight: "70px",
                marginTop: "20px",
              }}
            >
              Add Product
            </button>
            <Modal show={showModal} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      value={newProductTitle}
                      onChange={(e) => setNewProductTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      value={newProductAddress}
                      onChange={(e) => setNewProductAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={newProductType}
                      onChange={(e) => setNewProductType(e.target.value)}
                    >
                      <option value="selling">Selling</option>
                      <option value="donating">Donating</option>
                      <option value="borrowing">Borrowing</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter description"
                      value={newProductDescription}
                      onChange={(e) => setNewProductDescription(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Add Product
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="col-md-9" style={{ marginLeft: "-160px" }}>
            {/* Center-align the content */}
            <header className="text-center">
              <h1>Welcome to Bilkonnekt Marketplace</h1>
              <p>Find great deals on items near you</p>
            </header>

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

            <main style={{ marginTop: "20px" }}>
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
          height: 300px;
          margin-top: 160px;
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

        .search-bar {
          text-align: center;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}