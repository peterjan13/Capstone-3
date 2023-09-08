import { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext.js";
import Swal from "sweetalert2";

export default function ProductItem() {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const [quantity, setQuantity] = useState(1); // Initialize quantity with 1

  const handleOrderClick = () => {
    if (user.id) {
      // Send a request to create an order with the selected quantity
      fetch(`${process.env.REACT_APP_API_URL}/api/orders/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: user.id,
          productId: productId,
          quantity: quantity, // Include the quantity in the request
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "Order created successfully") {
            Swal.fire({
              title: "Order Placed Successfully!",
              text: result.message,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Something went wrong",
              text: "Please try again.",
              icon: "error",
            });
          }
        });
    } else {
      // Redirect to the login page if the user is not logged in
      navigate("/login");
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`)
      .then((response) => response.json())
      .then((result) => {
        setProduct({
          name: result.name,
          description: result.description,
          price: result.price,
        });
      });
  }, [productId]);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card className="applyBackground border mt-5">
            <Card.Body className="applyBackground textWhite my-5">
              <Card.Title>
                <h1 className="pt-3">{product.name}</h1>
              </Card.Title>

              <Card.Subtitle className="pt-3">
                <h3>Description:</h3>
              </Card.Subtitle>
              <Card.Text className="pt-1">{product.description}</Card.Text>

              <Card.Subtitle className="pt-3">
                <h3>Price:</h3>
              </Card.Subtitle>
              <Card.Text className="pt-1">₱{product.price}.00</Card.Text>

              {user.id !== null ? (
                <div className="d-flex flex-column">
                  <Form.Group controlId="quantity">
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      className="mt-3 order-button"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={handleOrderClick}
                    className="mt-3 btnHome"
                  >
                    Order
                  </Button>
                </div>
              ) : (
                <Link
                  className="btn btn-danger btn-block btnAnimate"
                  to="/login"
                >
                  Login to Buy
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
