"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useSession } from "next-auth/react";
import SaleProductCard from "../../../components/SaleProductCard";

export default function PostPage({ params }) {
    const { data: session } = useSession();
    const token = session?.backendTokens?.accessToken;
    const [productData, setProductData] = useState([]);

    const sellerId = params.slug;

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3500/api/product/getProductsByUserId?userId=${sellerId}`,
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

                    const numColumns = 4;
                    const itemsPerColumn = Math.ceil(re.length / numColumns);

                    const data = [];
                    for (let i = 0; i < numColumns; i++) {
                        data.push(
                            re.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
                        );
                    }
                    console.log({ data })
                    setProductData(data);
                } else {
                    console.error("Failed to fetch products");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        getProducts();
    }, [token]); // Fetch data only when token changes

    console.log({ productData })
    return (
        <div>
            <Navbar />
            <header className="text-center">
                <h1>Items of the Seller</h1>
                <p>{sellerId}</p>
            </header>
            <main style={{ marginTop: "20px" }}>
                {/* Product grid */}
                <div className="product-grid">
                    {productData.map((column, columnIndex) => (
                        <div key={columnIndex} className="column">
                            {column.map((product, index) => (
                                <div key={index} className="product-card">
                                    <SaleProductCard
                                        seller={product.sellerid}
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
                    ))}
                </div>
            </main>
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

          position: sticky;
          top: 160px;
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
