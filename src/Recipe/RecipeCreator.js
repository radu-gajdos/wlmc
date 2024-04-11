import React, { useState } from "react";
import axios from "axios";
import Navigation from "../Layout/Navigation";

/**
 * Component for displaying the creation form of a recipe and its functionality.
 * @returns {JSX.Element} The RecipeCreator component.
 */
const RecipeCreator = () => {
    // Initialize the form data state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        ingredients: [{ name: "", quantity: "", unit: "" }],
        instructions: [""],
        cookingTime: "",
        imageUrl: "",
        videoUrl: "",
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle ingredient input changes
    const handleIngredientChange = (index, e) => {
        const { name, value } = e.target;
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients[index][name] = value;
        setFormData({ ...formData, ingredients: updatedIngredients });
    };

    // Handle instruction input changes
    const handleInstructionChange = (index, e) => {
        const { value } = e.target;
        const updatedInstructions = [...formData.instructions];
        updatedInstructions[index] = value;
        setFormData({ ...formData, instructions: updatedInstructions });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        try {
            // Send a POST request to the server with the form data
            const response = await axios.post(
                "http://localhost:5000/api/recipes",
                formData,
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                }
            );
            // Redirect the user to the user recipes page
            window.location.href = "/user-recipes";
        } catch (error) {
            console.error("Error creating recipe:", error);
        }
    };

    // Add a new ingredient field
    const addIngredientField = () => {
        setFormData({
            ...formData,
            ingredients: [
                ...formData.ingredients,
                { name: "", quantity: "", unit: "" },
            ],
        });
    };

    // Add a new instruction field
    const addInstructionField = () => {
        setFormData({
            ...formData,
            instructions: [...formData.instructions, ""],
        });
    };

    return (
        <div>
            <Navigation />
            <div className="max-w-xl mx-auto p-4">
                <h1 className="text-3xl font-semibold mb-4 text-primary">
                    Create New Recipe
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-primary rounded-md shadow-md bg-forth shadow-md bg-forth"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-primary rounded-md shadow-md bg-forth shadow-md bg-forth"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ingredients
                        </label>
                        {formData.ingredients.map((ingredient, index) => (
                            <div key={index} className="flex space-x-2 mb-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={ingredient.name}
                                    onChange={(e) =>
                                        handleIngredientChange(index, e)
                                    }
                                    placeholder="Ingredient name"
                                    className="p-2 border border-primary rounded-md shadow-md bg-forth shadow-md bg-forth w-1/3"
                                    required
                                />
                                <input
                                    type="text"
                                    name="quantity"
                                    value={ingredient.quantity}
                                    onChange={(e) =>
                                        handleIngredientChange(index, e)
                                    }
                                    placeholder="Quantity"
                                    className="p-2 border border-primary rounded-md shadow-md bg-forth shadow-md bg-forth w-1/4"
                                    required
                                />
                                <input
                                    type="text"
                                    name="unit"
                                    value={ingredient.unit}
                                    onChange={(e) =>
                                        handleIngredientChange(index, e)
                                    }
                                    placeholder="Unit"
                                    className="p-2 border border-primary rounded-md shadow-md bg-forth shadow-md bg-forth w-1/4"
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addIngredientField}
                            className="text-sm text-gray-700"
                        >
                            + Add Ingredient
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Instructions
                        </label>
                        {formData.instructions.map((instruction, index) => (
                            <div key={index} className="flex space-x-2 mb-2">
                                <input
                                    type="text"
                                    value={instruction}
                                    onChange={(e) =>
                                        handleInstructionChange(index, e)
                                    }
                                    placeholder={`Step ${index + 1}`}
                                    className="p-2 border border-primary rounded-md shadow-md bg-forth shadow-md bg-forth w-full"
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addInstructionField}
                            className="text-sm text-gray-700"
                        >
                            + Add Instruction
                        </button>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="cookingTime"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Cooking Time (minutes)
                        </label>
                        <input
                            type="number"
                            id="cookingTime"
                            name="cookingTime"
                            value={formData.cookingTime}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-primary rounded-md shadow-md bg-forth shadow-md bg-forth"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="imageUrl"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-primary rounded-md shadow-md bg-forth shadow-md bg-forth shadow-md bg-forth"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="videoUrl"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Video URL
                        </label>
                        <input
                            type="text"
                            id="videoUrl"
                            name="videoUrl"
                            value={formData.videoUrl}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-primary rounded-md shadow-md bg-forth shadow-md bg-forth shadow-md bg-forth"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-secondary hover:bg-orange-400 text-white px-4 py-2 rounded-md shadow-md"
                    >
                        Create Recipe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RecipeCreator;
