const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Define the CORS options
const corsOptions = {
  origin: 'http://localhost:3000',  // Replace with the URL of your frontend (if running on a different port)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Connect to the database
connectDB();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Define the booking routes
app.use('/api/bookings', bookingRoutes);

// Set the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
