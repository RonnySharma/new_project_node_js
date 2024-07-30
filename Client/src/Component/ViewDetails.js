import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ViewDetails() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const productId = query.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      getProductDetail();
    }
  }, []);

  const getProductDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8001/productDetail`, {
        params: { id: productId },
      });
      setProduct(response.data.productData);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError(error.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    debugger
    // Check if product and userId are available
    if (!productId || !localStorage.getItem("id")) {
      alert("Please log in to add items to the cart.");
      navigate("/login");
      return;
    }
  
    // Validate product data
    // if (!product || !product.id) {
    //   alert("Product details are incomplete.");
    //   return;
    // }
  
    try {
      debugger
      // Send request to add product to cart
      await axios.post("http://localhost:8001/cart", {
        product: productId,
        user: localStorage.getItem("id"),
      });
  
      // Notify user and navigate to cart
      alert("Product added to cart!");
      navigate("/cart");
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        alert(`Error: ${error.response.data.message || "Failed to add product to cart."}`);
      } else if (error.request) {
        // Request was made but no response received
        alert("Error: No response from server.");
      } else {
        // Something else happened
        alert(`Error: ${error.message}`);
      }
      console.error("Error adding to cart:", error);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="container">
      <div className="row p-2 m-2">
        <div className="card mx-auto">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              className="card-img-top"
              src={`http://localhost:8001/${product.images[0]}`}
              alt={product.name}
              height="200"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">Product Name: {product.name}</h5>
            <h5 className="card-title">Product Description: {product.description}</h5>
            <h5 className="card-title">Product Price: ${product.price}</h5>
            <h5 className="card-title">Product Quantity: {product.qty}</h5>
            <button onClick={handleAddToCart} className="btn btn-md btn-info">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;