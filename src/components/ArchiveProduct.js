import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useCallback } from "react";

export default function ArchiveProduct({
  product_id,
  fetchProducts,
  isActive,
}) {
  const changeProductStatus = useCallback(
    (productId, action) => {
      const statusAction = action === "archive" ? "archive" : "activate";

      fetch(
        `${process.env.REACT_APP_API_URL}/api/products/${productId}/${statusAction}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            Swal.fire({
              title: `Product ${
                action.charAt(0).toUpperCase() + action.slice(1)
              }d!`,
              text: `Product has been successfully ${action}d.`,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Something went wrong",
              text: "Please try again.",
              icon: "error",
            });
          }

          fetchProducts();
        });
    },
    [fetchProducts]
  );

  return (
    <Button
      variant={isActive ? "warning" : "success"}
      size="sm"
      onClick={() =>
        changeProductStatus(product_id, isActive ? "archive" : "activate")
      }
    >
      {isActive ? "Archive" : "Activate"}
    </Button>
  );
}
