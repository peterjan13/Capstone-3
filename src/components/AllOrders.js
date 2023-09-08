import { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders (admin-only route)
    const fetchAllOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("User is not authenticated.");
          return;
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/orders/all-orders`,
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
          console.error("Failed to fetch all orders");
        }
      } catch (error) {
        console.error("Error fetching all orders:", error);
      }
    };

    fetchAllOrders();
  }, []);

  const ordersArray = orders.map((order) => (
    <tr key={order._id}>
      <td className="applyBackground textWhite">{order._id}</td>
      <td className="applyBackground textWhite">
        {new Date(order.purchasedOn).toLocaleString()}
      </td>
      <td className="applyBackground">
        {order.products.map((product) => (
          <div key={product.productId._id}>
            Product Name: {product.productId.name}
            <br />
            Quantity: {product.quantity} pcs.
            <br />
            Price: ₱{product.productId.price.toFixed(2)}
          </div>
        ))}
      </td>
      <td className="applyBackground textOrange">
        ₱{order.totalAmount.toFixed(2)}
      </td>{" "}
    </tr>
  ));

  return (
    <Container className="my-5">
      <h1>All Orders</h1>
      <Table className="mt-4" striped bordered hover responsive>
        <thead>
          <tr>
            <th className="applyBackground textYellow">ID</th>
            <th className="applyBackground textYellow">Purchased On</th>
            <th className="applyBackground textYellow">Products</th>
            <th className="applyBackground textBlue">Total</th>
          </tr>
        </thead>
        <tbody>{ordersArray}</tbody>
      </Table>
    </Container>
  );
}
