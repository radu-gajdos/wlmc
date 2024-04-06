const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const authenticateUser = require("../middleware/authenticate");

// Route: POST /api/review/:recipeId
// Description: Review a recipe
router.post("/:recipeId", authenticateUser, async (req, res) => {
    try {
        const review = new Review({
            content: req.body.content,
            user: req.user.id,
            recipe: req.params.recipeId
        });
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: GET /api/review/:recipeId
// Description: Get reviews of a recipe
router.get("/:recipeId", async (req, res) => {
    try {
        const reviews = await Review.find({ recipe: req.params.recipeId });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: PUT /api/review/:recipeId/:reviewId
// Description: Update a review
router.put("/:recipeId/:reviewId", authenticateUser, async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.reviewId, { content: req.body.content }, { new: true });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: DELETE /api/review/:recipeId/:reviewId
// Description: Delete a review
router.delete("/:recipeId/:reviewId", authenticateUser, async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json({ message: "Review deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
