import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from 'react-redux';
import { selectTotalPrice } from '../../Features/cartSlice';
import { useDispatch } from "react-redux";
import { clearCart } from "../../Features/cartSlice";

const CheckoutForm = () => {
  const totalPrice = useSelector(selectTotalPrice);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  // State to handle form submission feedback
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState("");
  const [paymentError, setPaymentError] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure Stripe and Elements are initialized
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      setLoading(true);

      // Create a token using CardElement
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        setPaymentError(error.message);
        setLoading(false);
        return;
      }

      // Send token and payment details to the backend
      const response = await axios.post("http://localhost:5000/api/payment", {
        token: token.id,
        amount: 5000, // Amount in cents, e.g., $50.00
      });

      if (response.data.success) {
        setPaymentSuccess("Payment successful! Thank you for your order.");
        setPaymentError("");
        // Optionally clear the card details
        cardElement.clear();
        dispatch(clearCart());
      } else {
        setPaymentError("Payment failed. Please try again.");
        setPaymentSuccess("");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setPaymentError("An error occurred while processing your payment.");
      setPaymentSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Complete Your Payment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Stripe Card Element */}
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#fa755a" },
                },
              }}
              className="p-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || loading}
            className={`w-full py-3 text-white rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Pay ₹ " + totalPrice}
          </button>
        </form>

        <div className="mt-6">
          <h2> Use 4242424242424242 as card number for dummy payment</h2>
        </div>

        {/* Display feedback messages */}
        {paymentError && (
          <div className="mt-4 text-red-600 text-center">{paymentError}</div>
        )}
        {paymentSuccess && (
          <div className="mt-4 text-green-600 text-center">{paymentSuccess}</div>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
