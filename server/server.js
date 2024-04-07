const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors middleware
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Enable CORS middleware

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});
