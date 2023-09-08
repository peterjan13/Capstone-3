import { Form, Button, Container } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext.js";

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.accessToken) {
          localStorage.setItem("token", result.accessToken);
          localStorage.setItem("userId", result.userId);

          retrieveUserDetails(result.accessToken, result.userId);

          setEmail("");
          setPassword("");

          Swal.fire({
            title: "Login Success",
            text: "You have logged in successfully!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Something went wrong",
            text: `${email} does not exist`,
            icon: "warning",
          });
        }
      });
  };

  const retrieveUserDetails = (token, userId) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users/details`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setUser({
          id: result._id,
          isAdmin: result.isAdmin,
        });
      });
  };

  useEffect(() => {
    setIsActive(email !== "" && password !== "");
  }, [email, password]);

  if (user.id !== null) {
    return <Navigate to="/products" />;
  }

  return (
    <Container className="mt-5 pt-5">
      <div className="mx-auto my-5 p-5 applyBackground rounded-border">
        <Form onSubmit={handleLogin}>
          <h1 className="m-0 text-center">Sign in</h1>
          <div className="d-flex flex-column align-items-center">
            <Form.Group controlId="userEmail" className="w-100">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="py-4 w-100">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <Button
            type="submit"
            id="submitBtn"
            disabled={!isActive}
            className="w-100 mb-3 mt-4 btnHome"
          >
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
}
