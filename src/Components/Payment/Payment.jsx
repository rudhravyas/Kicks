import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './Checkout';

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51Qc6E6Hzd9fmj2C94hk9Lj13VFEj1IEgLGhfsAnT5ySuJaY0HXCBbVt1hzoNth4qS6UaTm2g7QRiXpTe1VP09Rgd00NRrSDrfA');

const PaymentComponent = () => {
  return (
    <div>
      {/* Wrap the CheckoutForm with the Elements provider */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default PaymentComponent;
