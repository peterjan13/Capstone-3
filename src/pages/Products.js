import { useEffect, useState, useContext } from "react";
import AdminView from "../components/AdminView.js";
import UserView from "../components/UserView.js";
import UserContext from "../UserContext.js";

export default function Products() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/products/all`)
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
      });
  };

  useEffect(() => {
    // Define the fetchProducts function inside useEffect to make it more self-contained.
    const fetchProducts = () => {
      fetch(`${process.env.REACT_APP_API_URL}/api/products/all`)
        .then((response) => response.json())
        .then((result) => {
          setProducts(result);
        });
    };

    // Call fetchProducts when the component mounts
    fetchProducts();
  }, []);

  return (
    <>
      {user.isAdmin ? (
        <AdminView productsData={products} fetchProducts={fetchProducts} />
      ) : (
        <UserView productsData={products} />
      )}
    </>
  );
}
