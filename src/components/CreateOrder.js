import React, { useState } from "react";

function CreateOrder() {
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          products,
          totalAmount,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(errorData.error);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setMessage("An error occurred while creating the order");
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Products:</label>
          <input
            type="text"
            value={products}
            onChange={(e) => setProducts(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Total Amount:</label>
          <input
            type="text"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Order</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default CreateOrder;
