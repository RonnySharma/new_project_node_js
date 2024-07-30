
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ShoppingCart from '../containers/user/Shopping/Cart';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY="pk_test_51NYOktCFScgGj36O1DpVI2nOfT1APCgpqW2Ez9ULiLzhHyOX0Lhg9hpMfH5EJaVaoJLHM2NEIIrMCHO4tWw2JOST00u6tWZWZS");

function App() {
  return (
    <Elements stripe={stripePromise}>
      <ShoppingCart />
    </Elements>
  );
}

export default App;
