const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            name: String,
            quantity: String,
            unit: String,
        },
    ],
    instructions: {
        type: [String],
        required: true,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    imageUrl: String,
    videoUrl: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
