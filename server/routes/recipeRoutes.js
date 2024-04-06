const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const authenticateUser = require("../middleware/authenticate");

// Route: GET /api/recipes
// Description: Get a list of all recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: GET /api/recipes/:id
// Description: Get details of a specific recipe
router.get("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: POST /api/recipes
// Description: Create a new recipe
router.post("/", authenticateUser, async (req, res) => {
    const recipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        cookingTime: req.body.cookingTime,
        imageUrl: req.body.imageUrl,
        videoUrl: req.body.videoUrl,
        author: req.user.id // Assigning the author ID from the authenticated user
    });

    try {
        const newRecipe = await recipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route: PUT /api/recipes/:id
// Description: Update an existing recipe
router.put("/:id", authenticateUser, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        // Check if the authenticated user is the author of the recipe
        if (recipe.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to update this recipe" });
        }
        recipe.set(req.body);
        const updatedRecipe = await recipe.save();
        res.json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route: DELETE /api/recipes/:id
// Description: Delete a recipe
router.delete("/:id", authenticateUser, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        // Check if the authenticated user is the author of the recipe
        if (recipe.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this recipe" });
        }
        await recipe.remove();
        res.json({ message: "Recipe deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
