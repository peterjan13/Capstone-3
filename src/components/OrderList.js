import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders when the component mounts
    fetch(`${process.env.REACT_APP_API_URL}/api/orders/get-all-orders`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.orders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <Container className="mt-5">
      <h1>All Orders</h1>
      {orders.length === 0 ? (
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
      )}
    </Container>
  );
}
