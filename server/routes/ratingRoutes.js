const express = require("express");
const router = express.Router();
const Rating = require("../models/Rating");
const authenticateUser = require("../middleware/authenticate");

// Route: POST /api/ratings/:id
// Description: Rate a recipe
router.post("/:id", authenticateUser, async (req, res) => {
    try {
        const rating = new Rating({
            value: req.body.value,
            user: req.user.id,
            recipe: req.params.id
        });
        const newRating = await rating.save();
        res.status(201).json(newRating);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: GET /api/ratings/:id
// Description: Get ratings of a recipe
router.get("/:id", async (req, res) => {
    try {
        const ratings = await Rating.find({ recipe: req.params.id });
        res.json(ratings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: PUT /api/ratings/:id/:ratingId
// Description: Update a rating
router.put("/:id/:ratingId", authenticateUser, async (req, res) => {
    try {
        const rating = await Rating.findByIdAndUpdate(req.params.ratingId, { value: req.body.value }, { new: true });
        if (!rating) {
            return res.status(404).json({ message: "Rating not found" });
        }
        res.json(rating);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: DELETE /api/ratings/:id/:ratingId
// Description: Delete a rating
router.delete("/:id/:ratingId", authenticateUser, async (req, res) => {
    try {
        const rating = await Rating.findByIdAndDelete(req.params.ratingId);
        if (!rating) {
            return res.status(404).json({ message: "Rating not found" });
        }
        res.json({ message: "Rating deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
