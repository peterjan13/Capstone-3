import { useEffect, useState, useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import UserContext from "../UserContext";

export default function Orders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user.id) {
      // Fetch user's orders when the component mounts
      fetch(`${process.env.REACT_APP_API_URL}/api/orders/get-user-orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setOrders(data.orders);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [user.id]);

  return (
    <Container className="mt-5">
      <h1>Your Orders</h1>
      {user.id ? (
        orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <h4>Order {index + 1}</h4>
                <p>Order ID: {order._id}</p>
                <p>Total Amount: {order.totalAmount}</p>
                <h5>Products:</h5>
                <ul>
                  {order.products.map((product, productIndex) => (
                    <li key={productIndex}>
                      {product.name} - {product.price}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          ))
        )
      ) : (
        <div>
          <p>Please log in to view your orders.</p>
          <Button variant="primary" href="/login">
            Login
          </Button>
        </div>
      )}
    </Container>
  );
}
