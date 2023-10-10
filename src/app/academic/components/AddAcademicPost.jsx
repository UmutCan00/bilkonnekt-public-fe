import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddAcademicPost = ({showModal, closeModal}) => {
    const [newProductTitle, setNewProductTitle] = useState("");
    const [newProductPrice, setNewProductPrice] = useState("");
    const [newProductAddress, setNewProductAddress] = useState("");
    const [newProductType, setNewProductType] = useState("");
    const [newProductDescription, setNewProductDescription] = useState("");

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


    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Create Your Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
    );
};

export default AddAcademicPost;
