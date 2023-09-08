import { Container, Table } from "react-bootstrap";
import EditProduct from "./EditProduct";
import ArchiveProduct from "./ArchiveProduct";

export default function AdminView({ productsData, fetchProducts }) {
  const productsArray = productsData.map((product) => (
    <tr key={product._id}>
      <td className="applyBackground textWhite">{product._id}</td>
      <td className="applyBackground textWhite">{product.name}</td>
      <td className="applyBackground textWhite">{product.description}</td>
      <td className="applyBackground textWhite">₱{product.price}.00</td>
      <td className="applyBackground textWhite">
        {product.isActive ? "Available" : "Unavailable"}
      </td>
      <td className="applyBackground textWhite">
        <EditProduct product_id={product._id} fetchProducts={fetchProducts} />
      </td>
      <td className="applyBackground textWhite">
        <ArchiveProduct
          product_id={product._id}
          fetchProducts={fetchProducts}
          isActive={product.isActive}
        />
      </td>
    </tr>
  ));

  return (
    <Container className="my-5">
      <h1>Admin Dashboard</h1>
      <Table className="mt-3" striped bordered hover responsive>
        <thead>
          <tr>
            <th className="applyBackground textYellow">ID</th>
            <th className="applyBackground textYellow">Name</th>
            <th className="applyBackground textYellow">Description</th>
            <th className="applyBackground textYellow">Price</th>
            <th className="applyBackground textYellow">Availability</th>
            <th className="text-center applyBackground textBlue" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{productsArray}</tbody>
      </Table>
    </Container>
  );
}
