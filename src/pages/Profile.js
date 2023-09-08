import { Row, Col, Spinner, Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext.js";
import { useState, useContext, useEffect } from "react";

export default function Profile() {
  const { user } = useContext(UserContext);

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user.id) {
      fetch(`${process.env.REACT_APP_API_URL}/api/users/details`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (typeof result._id !== "undefined") {
            setDetails(result);
          } else {
            setError("Failed to fetch user details.");
          }
        })
        .catch((error) => {
          setError("An error occurred while fetching user details.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user.id]);

  if (user.id === null) {
    return <Navigate to="/products" />;
  }

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container-50 mx-auto">
      <Container className="mt-5 pt-4">
        <h1 className="text-center">PROFILE</h1>
        <Row className="rounded-border mt-5 text-center applyBackground">
          <Col className="p-5">
            <h2 className="mt-3 textOrange">{`${details.firstName} ${details.lastName}`}</h2>
            <h3 className="mt-4">Contact Information:</h3>
            <h5>Email: {details.email}</h5>
            <h5>Mobile No: {details.mobileNo}</h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
