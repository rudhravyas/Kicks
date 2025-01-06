const express = require('express');
const dotenv = require('dotenv');
const stripe = require('stripe');
const cors = require('cors'); // Import the cors package

// Load environment variables
dotenv.config();

const app = express();
const PORT = 5000;

// Enable CORS for all origins or specify allowed origins
app.use(cors({
  origin: 'http://localhost:5173', // Your React app's URL
}));

// Middleware to parse JSON
app.use(express.json());

// Set up Stripe with your secret key
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Stripe Payment API!');
});

// Payment route
app.post('/api/payment', async (req, res) => {
  const { token, amount } = req.body;

  try {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
      description: 'Test Payment',
      payment_method_data: {
        type: 'card',
        card: {
          token: token,
        },
      },
    });

    res.json({ success: true, paymentIntent });
  } catch (err) {
    console.error('Error processing payment:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});