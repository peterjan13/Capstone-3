import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Container } from "react-bootstrap";

export default function UserView({ productsData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Filter products that are active and map them to ProductCard components
    const activeProducts = productsData
      .filter((product) => product.isActive)
      .map((product) => <ProductCard product={product} key={product._id} />);

    setProducts(activeProducts);
  }, [productsData]);

  return (
    <Container className="my-5">
      <h1 className="ps-2 ms-1">Products</h1>
      {products}
    </Container>
  );
}
