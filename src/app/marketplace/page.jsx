// pages/index.js
"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
//import productdata from "../mockdata/productdata";
import Navbar from "../components/Navbar";
import SaleProductCard from "../components/SaleProductCard";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { v4 } from "uuid";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export default function Home() {
  const { data: session } = useSession();
  const token = session?.backendTokens?.accessToken;
  const [productdata, setproductdata] = useState([]);
  const [initialProducts, setinitialProducts] = useState([]);
  const isBanned = session?.user?.isBanned;
  const router = useRouter();
  if (isBanned) router.push("/");
  console.log("initialProducts", initialProducts);

  // State for search input, selected type, and products
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [products, setProducts] = useState(initialProducts);
  console.log("products: ", products);
  // Function to filter products based on search and type

  const filteredProducts = products?.filter((product) => {
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
  const [newProductType, setNewProductType] = useState("selling");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductDuration, setNewProductDuration] = useState("");

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  let imgURL = "foo";
  let uploadedImageURL = "false";

  const uploadImageFirst = async () => {
    try {
      uploadedImageURL = await uploadImage();
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3500/api/product/getProducts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const re = await response.json();
          setinitialProducts(re); // Update initialProducts when data is fetched successfully
          setProducts(re); // Update products too
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [token]); // Fetch data only when token changes

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Function to handle the modal open
  const openModal = () => {
    setShowModal(true);
  };

  // Function to handle the modal close
  const closeModal = () => {
    setShowModal(false);
  };

  const numColumns = 4;
  const itemsPerColumn = Math.ceil(filteredProducts.length / numColumns);

  const columns = [];
  for (let i = 0; i < numColumns; i++) {
    columns.push(
      filteredProducts.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
    );
  }
  const dynamicGridTemplateColumns = `repeat(auto-fill, minmax(calc(100% / ${numColumns}), 1fr))`;

  const uploadImage = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        return getDownloadURL(imageRef);
      })
      .then((downloadURL) => {
        uploadedImageURL = downloadURL;
        console.log("Image URL:", uploadedImageURL);
        alert("Image uploaded");
        return downloadURL;
      })
      .then(() => {
        fetch("http://localhost:3500/api/product/createProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: newProductTitle,
            price: parseFloat(newProductPrice),
            address: newProductAddress,
            type: newProductType,
            description: newProductDescription,
            imageURL: uploadedImageURL,
            duration: parseFloat(newProductDuration),
          }),
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
    closeModal();
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar for type filtering */}
          <div className="col-md-3 ">
            <div className="fixed-element">
              <div className="sidebar titleColor text-white">
                <div>
                  <h3 style={{ marginBottom: "30px" }}>Filter by Type</h3>
                  <ul>
                    <li>
                      <button
                        style={{ fontSize: "20px", marginBottom: "10px" }}
                        onClick={() => setSelectedType("")}
                      >
                        All
                      </button>
                    </li>
                    <li>
                      <button
                        style={{ fontSize: "20px", marginBottom: "10px" }}
                        onClick={() => setSelectedType("selling")}
                      >
                        Selling
                      </button>
                    </li>
                    <li>
                      <button
                        style={{ fontSize: "20px", marginBottom: "10px" }}
                        onClick={() => setSelectedType("donating")}
                      >
                        Donating
                      </button>
                    </li>
                    <li>
                      <button
                        style={{ fontSize: "20px", marginBottom: "10px" }}
                        onClick={() => setSelectedType("borrowing")}
                      >
                        Borrowing
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <button
                className="btn btn-success text-nowrap"
                onClick={openModal}
                style={{
                  fontSize: "20px",
                  maxWidth: "200px",
                  maxHeight: "70px",
                  marginTop: "20px",
                }}
              >
                Add Product
              </button>
            </div>
            <Modal show={showModal} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={newProductType}
                      onChange={(e) => {
                        setNewProductType(e.target.value);
                        if (e.target.value == "borrowing") {
                          setNewProductPrice(null);
                        }
                        if (e.target.value == "selling") {
                          setNewProductDuration(null);
                        }
                        if (e.target.value == "donating") {
                          setNewProductPrice(null);
                          setNewProductDuration(null);
                        }
                      }}
                    >
                      <option value="selling">Selling</option>
                      <option value="donating">Donating</option>
                      <option value="borrowing">Borrowing</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      value={newProductTitle}
                      onChange={(e) => setNewProductTitle(e.target.value)}
                    />
                  </Form.Group>
                  {newProductType == "borrowing" && (
                    <Form.Group controlId="title">
                      <Form.Label>Days to Borrow</Form.Label>
                      <Form.Control
                        type="number"
                        min={0}
                        onKeyPress={(event) => {
                          if (!/[0-9.]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        placeholder="Enter days to borrow"
                        value={newProductDuration}
                        onChange={(e) => setNewProductDuration(e.target.value)}
                      />
                    </Form.Group>
                  )}
                  {newProductType == "selling" && (
                    <Form.Group controlId="price">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        min={0}
                        onKeyPress={(event) => {
                          if (!/[0-9.]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        placeholder="Enter price"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                      />
                    </Form.Group>
                  )}
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      value={newProductAddress}
                      onChange={(e) => setNewProductAddress(e.target.value)}
                    />
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
                <input
                  type="file"
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={uploadImageFirst}>
                  Add Product
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="col-md-9" style={{ marginLeft: "-160px" }}>
            {/* Center-align the content */}
            <header
              className=" card text-center mx-auto titleColor m-2 text-white"
              style={{ maxWidth: "500px" }}
            >
              <h1>Welcome to Bilkonnekt Marketplace </h1>
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
              <div className="container-fluid card bg-custom1 ">
                {/* Product grid */}
                <div
                  className="list"
                  style={{
                    marginTop: "10px",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "15px",
                  }}
                >
                  {filteredProducts.map((product, index) => (
                    <div key={index} className="product-card">
                      <SaleProductCard
                        seller={product.sellerid}
                        sellerName={product.sellerName}
                        productid={product._id}
                        title={product.title}
                        price={product.price}
                        location={product.address}
                        type={product.type}
                        description={product.description}
                        imageURL={product.imageURL}
                      />
                    </div>
                  ))}
                </div>
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
        .bg-custom1 {
          background-color: #0b1356;
        }
        .sidebar {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
          width: 225px;
          height: 300px;
          margin-top: 210px;
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
        .titleColor {
          background-color: #0b1356;
        }
        .fixed-element {
          position: fixed;
          margin-top: 600; /* Stick to the top of the viewport */
          left: 10; /* Stick to the left of the viewport */
          width: 15%; /* Take up the full width of the viewport */

          z-index: 1000; /* Set a high z-index to ensure it's on top of other elements */
        }
      `}</style>
    </div>
  );
}
