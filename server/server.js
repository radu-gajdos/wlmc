// Import necessary modules at the top of server.js:
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Import dotenv for environment variables
const userRoutes = require("./routes/userRoutes"); // Import user routes
const recipeRoutes = require("./routes/recipeRoutes"); // Import recipe routes
const collectionRoutes = require("./routes/collectionRoutes"); // Import collection routes
const ratingRoutes = require("./routes/ratingRoutes"); // Import rating routes
dotenv.config(); // Load environment variables from .env file

// Set up your Express app:
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Mount user routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/ratings", ratingRoutes);

// Start the server:
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Connect to MongoDB Atlas using Mongoose:
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});
