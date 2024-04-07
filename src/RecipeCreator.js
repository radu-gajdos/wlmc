import React, { useState } from "react";
import axios from "axios";


const RecipeCreator = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    instructions: [""],
    cookingTime: "",
    imageUrl: "",
    videoUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][name] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleInstructionChange = (index, e) => {
    const { value } = e.target;
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData({ ...formData, instructions: updatedInstructions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/recipes", formData, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      });
      console.log("Recipe created successfully:", response.data);
      // Optionally, redirect the user to another page after successful creation
    } catch (error) {
      console.error("Error creating recipe:", error);
      // Optionally, display an error message to the user
    }
  };

  const addIngredientField = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: "", quantity: "", unit: "" }],
    });
  };

  const addInstructionField = () => {
    setFormData({ ...formData, instructions: [...formData.instructions, ""] });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Create New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Add more input fields for other recipe properties (description, cookingTime, imageUrl, videoUrl, etc.) */}
        {/* Ingredients */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                name="name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Ingredient name"
                className="p-2 border-gray-300 rounded-md w-1/3"
                required
              />
              <input
                type="text"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Quantity"
                className="p-2 border-gray-300 rounded-md w-1/4"
                required
              />
              <input
                type="text"
                name="unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Unit"
                className="p-2 border-gray-300 rounded-md w-1/4"
                required
              />
            </div>
          ))}
          <button type="button" onClick={addIngredientField} className="text-sm text-gray-700">
            + Add Ingredient
          </button>
        </div>
        {/* Instructions */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e)}
                placeholder={`Step ${index + 1}`}
                className="p-2 border-gray-300 rounded-md w-full"
                required
              />
            </div>
          ))}
          <button type="button" onClick={addInstructionField} className="text-sm text-gray-700">
            + Add Instruction
          </button>
        </div>
        {/* Cooking Time */}
        <div className="mb-4">
          <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md"
          />
        </div>
        {/* Video URL */}
        <div className="mb-4">
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
            Video URL
          </label>
          <input
            type="text"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeCreator;
