const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware for handling authentication
const authenticateUser = (req, res, next) => {
    // Check if the request contains a valid JWT token
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Route: POST /api/users/signup
// Description: Create a new user account
router.post("/signup", async (req, res) => {
    try {
        // Check if the email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create the user
        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: POST /api/users/login
// Description: Authenticate a user and generate a JWT token
router.post("/login", async (req, res) => {
    try {
        // Check if the user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { user: { id: user._id } },
            process.env.JWT_SECRET
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: GET /api/users/profile
// Description: Get the profile information of the authenticated user
router.get("/profile", authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: PUT /api/users/profile
// Description: Update the profile information of the authenticated user
router.put("/profile", authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Update the user's profile information
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        await user.save();

        res.json({ message: "Profile updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: GET /api/users/:userId/username
// Description: Get a user's username by their ID
router.get("/:userId/username", async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with the user's username
        res.json({ username: user.username });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
