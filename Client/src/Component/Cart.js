import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";


// Initialize Stripe with your public key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY="pk_test_51PhwB1EQWmmOIPSOY3srLu4cpLwgodtc6EFYIQt3EsSGVCso1fkZwAU1anuHt1flbk0SLoPy5FcpbSvx0cqiq6VW00OFSr1CxO");

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    userId: '',
    name: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: ''
  });
  const navigate = useNavigate();
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8001/cart", {
          params: { userId: localStorage.getItem("id") }
        });
        setCartItems(response.data.cartData);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Error fetching cart items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();

    const userId = localStorage.getItem('id');
    if (userId) {
      setForm(prevForm => ({ ...prevForm, userId }));
    }
  }, []);

  const handleCheckoutAndSubmit = async () => {
    try {
      // const data = { ...form, products: cartItems };
      // await axios.post('http://localhost:8001/order', data);

      // setConfirmationMessage('Congratulations, Your Order will be confirmed when the payment is received');
      // setTimeout(() => setConfirmationMessage(''), 5000);

      // // Clearing the localStorage might be too aggressive; consider only removing necessary items
      // localStorage.removeItem('cart');

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe has not loaded yet.');
      }

      const response = await fetch('http://localhost:8001/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: cartItems }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error('Error redirecting to checkout:', result.error.message);
        alert(result.error.message);
      }

    } catch (error) {
      console.error('Failed to submit data', error);
      alert('Failed to submit data');
    }
  };

  const removeItemFromCart = async (id) => {
    try {
      await axios.delete("http://localhost:8001/cart", { data: { id } });
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Failed to remove item from cart. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map(item => (
                <div key={item.id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`http://localhost:8001/${item.product.images}`}
                        alt={item.product.productName}
                        className="img-fluid rounded-start"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.product.productName}</h5>
                        <p className="card-text">Quantity: {item.count}</p>
                        <p className="card-text">Price: ${item.count * item.product.price}</p>
                        <button className="btn btn-danger" onClick={() => removeItemFromCart(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center">
                <button className='btn btn-primary' onClick={handleCheckoutAndSubmit}>Pay And Check-Out</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
