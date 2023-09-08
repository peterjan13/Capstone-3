import { useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext.js";

export default function AddProduct() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const createProduct = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}/api/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          Swal.fire({
            title: "New Product Added",
            icon: "success",
          });

          // Clear the form
          setProduct({
            name: "",
            description: "",
            price: 0,
          });

          // Redirect to /products after creating a new product
          navigate("/products");
        } else {
          Swal.fire({
            title: "Something went wrong",
            text: "Product creation unsuccessful",
            icon: "error",
          });
        }
      });
  };

  return user.isAdmin ? (
    <>
      <h1 className="my-5 text-center">Add Product</h1>
      <Form onSubmit={createProduct}>
        <Container className="form-container mx-auto p-5 rounded-border applyBackground">
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              required
              value={product.name}
              onChange={(event) =>
                setProduct({ ...product, name: event.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-4">Description:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              required
              value={product.description}
              onChange={(event) =>
                setProduct({ ...product, description: event.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-4">Price:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              required
              value={product.price}
              onChange={(event) =>
                setProduct({ ...product, price: event.target.value })
              }
            />
          </Form.Group>
          <Button type="submit" className="mt-5 mb-1 btnHome btn-submit">
            Submit
          </Button>
        </Container>
      </Form>
    </>
  ) : (
    <Navigate to="/products" />
  );
}
