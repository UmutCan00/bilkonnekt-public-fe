"use client";
import Link from "next/link";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={6} className="mt-4">
            <Link href="academic/group-hub">
              <Card className="mb-3 w-100">
                <Card.Body>See Your Groups</Card.Body>
              </Card>
            </Link>
            <Link href="academic/find-groups">
              <Card className="mb-3 w-100">
                <Card.Body>Search Groups for Your Project</Card.Body>
              </Card>
            </Link>
            <Link href="academic/find-groups">
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
          </Col>
          <Col md={6}>
            {/* Add any additional content or design for the right-side section */}
          </Col>
        </Row>
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
      `}</style>
    </div>
  );
}
