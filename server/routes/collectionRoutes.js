const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");
const Recipe = require("../models/Recipe");
const authenticateUser = require("../middleware/authenticate");

// Route: GET /api/collections
// Description: Get a list of all collections
router.get("/", async (req, res) => {
    try {
        const collections = await Collection.find();
        res.json(collections);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: GET /api/collections/:id
// Description: Get details of a specific collection
router.get("/:id", async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }
        res.json(collection);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: POST /api/collections
// Description: Create a new collection
router.post("/", authenticateUser, async (req, res) => {
    const collection = new Collection({
        name: req.body.name,
        owner: req.user.id // Assigning the owner ID from the authenticated user
    });

    try {
        const newCollection = await collection.save();
        res.status(201).json(newCollection);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route: PUT /api/collections/:id
// Description: Update an existing collection
router.put("/:id", authenticateUser, async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }
        // Check if the authenticated user is the owner of the collection
        if (collection.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to update this collection" });
        }
        collection.name = req.body.name || collection.name;
        await collection.save();
        res.json({ message: "Collection updated successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route: DELETE /api/collections/:id
// Description: Delete a collection
router.delete("/:id", authenticateUser, async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }
        // Check if the authenticated user is the owner of the collection
        if (collection.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this collection" });
        }
        await collection.remove();
        res.json({ message: "Collection deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: POST /api/collections/:collectionId/add-recipe/:recipeId
// Description: Add a recipe to a collection
router.post("/:collectionId/add-recipe/:recipeId", async (req, res) => {
    try {
        // Find the collection by ID
        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }

        // Find the recipe by ID
        const recipe = await Recipe.findById(req.params.recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Add the recipe to the collection
        collection.recipes.push(recipe);
        await collection.save();

        res.status(200).json({ message: "Recipe added to collection successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: DELETE /api/collections/:collectionId/remove-recipe/:recipeId
// Description: Remove a recipe from a collection
router.delete("/:collectionId/remove-recipe/:recipeId", async (req, res) => {
    try {
        // Find the collection by ID
        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }

        // Remove the recipe from the collection
        collection.recipes = collection.recipes.filter(recipeId => recipeId != req.params.recipeId);
        await collection.save();

        res.status(200).json({ message: "Recipe removed from collection successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
