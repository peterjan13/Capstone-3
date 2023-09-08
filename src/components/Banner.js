import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Banner() {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle the "Buy now!" button click
  function handleBuyNowClick() {
    // Redirect to the products page when the button is clicked
    navigate("/products");
  }

  return (
    <div className="text-justify p-5">
      <h1>MATRIXX PROSTHETIC PRODUCTS</h1>
      <p>
        In the realm of assistive technology, MATRIXX is a distinguished
        provider of prosthetic products. These innovative offerings encompass
        artificial limbs, orthotic devices, and other customized solutions.
        Designed to optimize the quality of life for individuals who have
        suffered limb loss or limb differences, MATRIXX's prosthetic products
        empower users by restoring mobility and functionality.
      </p>
      <Button
        className="applyBackground btnAnimate"
        onClick={handleBuyNowClick}
      >
        Go to products
      </Button>
    </div>
  );
}
