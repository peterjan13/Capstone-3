import { Button, Modal, Form, Container } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EditProduct({ product_id, fetchProducts }) {
  const [productData, setProductData] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);

  const openEditModal = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`)
      .then((response) => response.json())
      .then((result) => {
        setProductData({
          _id: result._id,
          name: result.name,
          description: result.description,
          price: result.price,
        });
        setShowEditModal(true);
      });
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const updateProduct = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/api/products/${productData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          Swal.fire({
            title: "Product Updated!",
            text: "Product successfully updated.",
            icon: "success",
          });

          fetchProducts();
          closeEditModal();
        } else {
          Swal.fire({
            title: "Something went wrong",
            text: "Please try again.",
            icon: "error",
          });

          fetchProducts();
          closeEditModal();
        }
      });
  };

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        onClick={() => openEditModal(product_id)}
      >
        Edit
      </Button>

      {/* Edit modal */}
      <Modal show={showEditModal} onHide={closeEditModal} centered>
        <Container className="modalBackground border">
          <form onSubmit={updateProduct}>
            <Modal.Header className="productModal mt-3 pb-0" closeButton>
              <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="productName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="productDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                  required
                  style={{ resize: "vertical" }}
                />
              </Form.Group>
              <Form.Group controlId="productPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={productData.price}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      price: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="productModal mb-3">
              <Button variant="danger" onClick={closeEditModal}>
                Cancel
              </Button>
              <Button variant="warning" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Container>
      </Modal>
    </>
  );
}
