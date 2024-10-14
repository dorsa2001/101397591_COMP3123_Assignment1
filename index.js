const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes"); // Import your user routes
const employeeRoutes = require("./routes/employeeRoutes"); // Import your employee routes

// Initialize environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define routes after initializing `app`
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeeRoutes); // Set base path for employee routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
