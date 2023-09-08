import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user-specific orders and update the 'orders' state
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("User is not authenticated.");
          return;
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/orders/user-orders`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          console.error("Failed to fetch user orders");
        }
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchUserOrders();
  }, []);

  return (
    <div>
      <Container className="my-5 p-3">
        <h1 className="text-center">Your Orders</h1>
        <container>
          {orders.map((order) => (
            <p
              key={order._id}
              className="rounded-border p-3 my-4 applyBackground"
            >
              <div>Order ID: {order._id}</div>
              <div>
                Order Date: {new Date(order.purchasedOn).toLocaleString()}
              </div>
              <div>
                <p>
                  {order.products.map((product) => (
                    <p key={product.productId}>
                      <div>Product Name: {product.name}</div>
                      <div>Price: ₱{product.price}.00</div>
                      <div>Quantity: {product.quantity} pcs.</div>
                    </p>
                  ))}
                </p>
              </div>
              <div className="textOrange">
                Total Amount: ₱{order.totalAmount}.00
              </div>
            </p>
          ))}
        </container>
      </Container>
    </div>
  );
}
