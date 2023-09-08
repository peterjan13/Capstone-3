import { Form, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext.js";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const { user } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  // Use useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  function registerUser(event) {
    event.preventDefault();

    // Client-side input validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobileNo ||
      !password ||
      !confirmPassword
    ) {
      Swal.fire({
        title: "Validation Error",
        text: "All fields are required.",
        icon: "error",
      });
      return; // Stop execution if any field is empty
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Validation Error",
        text: "Passwords do not match.",
        icon: "error",
      });
      return; // Stop execution if passwords don't match
    }

    if (mobileNo.length !== 11) {
      Swal.fire({
        title: "Validation Error",
        text: "Mobile number should be 11 digits.",
        icon: "error",
      });
      return; // Stop execution if mobile number length is not 11
    }

    // Send a request to the registration endpoint
    const userData = {
      firstName,
      lastName,
      email,
      mobileNo,
      password,
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          // Reset all input fields
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setConfirmPassword("");

          Swal.fire({
            title: "Register Successful",
            text: "You can now login!",
            icon: "success",
          });
          // Use navigate to redirect to the login page after successful registration
          navigate("/login");
        } else {
          Swal.fire({
            title: "Registration Failed",
            text: "Please try again later.",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        Swal.fire({
          title: "Registration Error",
          text: "An error occurred during registration. Please try again later.",
          icon: "error",
        });
      });
  }

  // The useEffect arrow function will trigger everytime there are changes in the data within the 2nd argument array.
  // Note: If the 2nd argument array is empty, then the function will only run upon the initial loading of the component.
  useEffect(() => {
    // Checks if all fields aren't empty, if password and confirm password fields are matching, and mobile number is 11 characters.
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  return user.id !== null ? (
    <Navigate to="/products" />
  ) : (
    <div className="my-5 mx-auto p-5 rounded-border applyBackground">
      <Form onSubmit={(event) => registerUser(event)}>
        <h1 className="mb-3 text-center">Register</h1>
        <div className="d-flex flex-column align-items-center">
          {" "}
          {/* Wrap in a flex container */}
          <Form.Group className="mt-3 w-100">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              required
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mt-3 w-100">
            {" "}
            {/* Set width to 100% */}
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              required
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mt-3 w-100">
            {" "}
            {/* Set width to 100% */}
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mt-3 w-100">
            {" "}
            {/* Set width to 100% */}
            <Form.Label>Mobile No:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter 11 Digit No."
              required
              value={mobileNo}
              onChange={(event) => {
                setMobileNo(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mt-3 w-100">
            {" "}
            {/* Set width to 100% */}
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mt-3 mb-3 w-100">
            {" "}
            {/* Set width to 100% */}
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
          </Form.Group>
        </div>
        <Button
          className="mt-4 mb-1 w-100 btnHome"
          type="submit"
          disabled={!isActive}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
