import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import './Home.css'; // Import custom CSS for styling

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8001/productget");
      
      setProducts(response.data.productData);
    } catch (error) {
      console.error("There was an error fetching the products!", error);
    }
  };

  const renderProduct = () => {
    return products.map((item) => (
      <div className="col-md-4 mb-4" key={item._id}>
        <div className="card">
          <img
            className="card-img-top"
            src={`http://localhost:8001/${item.images[0]}`} // Assuming the first image is the main one
            alt={item.name}
            height="200"
            style={{ objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">{item.description}</p>
            <p className="card-text"><strong>Price:</strong> ${item.price}</p>
            <p className="card-text"><strong>Quantity:</strong> {item.qty}</p>
            <Link to={`/ViewDetails?id=${item._id}`} className="btn btn-primary">
              View Details
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        {renderProduct()}
      </div>
    </div>
  );
}

export default Home;
