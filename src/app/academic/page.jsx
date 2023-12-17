"use client";
import Link from "next/link";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <header  className=" card text-center mx-auto titleColor m-2 text-white" style={{ maxWidth:"500px",marginBottom:"-500px" }}>
          <h1>Welcome to Bilkonnekt Academic </h1>
          <p>Collaborate with other students.</p>
        </header>
      <Container className=" text-center   text-white" style={{whiteSpace:"nowrap",}} >
        <div className="  row " >
          <div  className=" card titleColor col mt-4" style={{marginLeft:"435px"}}>
            <Link href="academic/group-hub">
              <Card className="mb-3 mt-3  w-100">
                <Card.Body>See Your Groups</Card.Body>
              </Card>
            </Link>
            <Link href="academic/find-groups">
              <Card className="mb-3 w-100">
                <Card.Body>Search Groups for Your Project</Card.Body>
              </Card>
            </Link>
            <Link href="academic/find-groups/by-id">
              <Card className="mb-3 w-100">
                <Card.Body>Find Group by ID</Card.Body>
              </Card>
            </Link>
            <Link href="academic/create-group">
              <Card className="mb-3 w-100">
                <Card.Body>Create a Group from Scratch</Card.Body>
              </Card>
            </Link>
            <Link href="/academic/section-swap">
              <Card className="mb-3 w-100">
                <Card.Body>Swap Sections with Friends</Card.Body>
              </Card>
            </Link>
          </div>
          <div className="col" md={6}>
            {/* Add any additional content or design for the right-side section */}
          </div>
        </div>
      </Container>
      <style jsx>{`
        .mt-4 {
          margin-top: 20px;
        }

        .w-100 {
          width: 100%;
        }

        /* Adjust styling for the clickable cards */
        .w-100:hover {
          cursor: pointer;
          /* Add any additional hover effects */
        }
        .titleColor{
          background-color: #0B1356;
        }
      `}</style>
    </div>
  );
}
