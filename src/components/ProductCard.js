import { Card, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { _id, name, description, price } = product;

  return (
    <Container>
      <Card className="applyBackground textWhite border mt-4">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="pt-2">Description:</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Card.Subtitle>Price:</Card.Subtitle>
          <Card.Text>₱{price}.00</Card.Text>
          <Link
            to={`/products/${_id}`}
            className="btn btn-primary btnAnimate applyBackground"
          >
            View Details
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
