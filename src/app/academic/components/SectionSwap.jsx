import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSession } from "next-auth/react";

const SectionSwap = ({showModal, closeModal, posts, setSWPost}) => {
    const [newSWCourseCode, setNewSWCourseCode] = useState("");
    const [newSWInitialSection, setNewSWInitialSection] = useState("");
    const [newSWRequestedSection, setNewSWRequestedSection] = useState("");
    const [newProductType, setNewProductType] = useState("");
    const { data: session } = useSession();
    const token = session?.backendTokens?.accessToken;

    const handleSubmit = () => {
        // Create a new product object with the entered values

        if (newSWInitialSection == newSWRequestedSection){
            return;
        }
        try {
            fetch("http://localhost:3500/api/group/createSectionChange", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    courseCode: newSWCourseCode,
                    currentSection: newSWInitialSection,
                    aimedSection: newSWRequestedSection
                }),
            });
            window.location.reload();
        } catch (error) {
            console.log("section change failed: ", error);
        }

        closeModal();
    };


    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Request Section Change</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="courseCode">
                        <Form.Label>Course Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter course code"
                            value={newSWCourseCode}
                            onChange={(e) => setNewSWCourseCode(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="initialSection">
                        <Form.Label>Initial section</Form.Label>
                        <Form.Control
                            type="number"
                            min={1}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            placeholder="Enter your current section number"
                            value={newSWInitialSection}
                            onChange={(e) => setNewSWInitialSection(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="requestedSection">
                        <Form.Label>Requested section</Form.Label>
                        <Form.Control
                            type="number"
                            min={1}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            placeholder="Enter the section number you want"
                            value={newSWRequestedSection}
                            onChange={(e) => setNewSWRequestedSection(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Publish
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SectionSwap;
