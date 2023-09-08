import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserProvider } from "./UserContext.js";
import AppNavbar from "./components/AppNavbar.js";
import Home from "./pages/Home.js";
import Products from "./pages/Products.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Logout from "./pages/Logout.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";
import ProductItem from "./pages/ProductItem.js";
import AddProduct from "./pages/AddProduct.js";
import CreateOrder from "./components/CreateOrder.js";
import UserOrders from "./pages/UserOrders";
import AllOrdersPage from "./pages/AllOrdersPage.js";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          // User is not authenticated
          setUser({
            id: null,
            isAdmin: null,
          });
          return;
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/users/details`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: userId,
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          setUser({
            id: result._id,
            isAdmin: result.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductItem />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
            {user.id && !user.isAdmin && (
              <Route path="/create-order" element={<CreateOrder />} />
            )}
            {user.id && !user.isAdmin && (
              <Route path="/user-orders" element={<UserOrders />} />
            )}
            {user.id && user.isAdmin && (
              <Route path="/admin/all-orders" element={<AllOrdersPage />} />
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
