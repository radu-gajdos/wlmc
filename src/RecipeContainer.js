import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const RecipeContainer = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <Link to={`/recipes/${recipeId}`} style={{ textDecoration: 'none' }}> {/* Wrap the container with Link component */}
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4" style={{ width: '300px', height: '300px' }}>
        <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-40 object-cover object-center" />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
          <p className="text-gray-600">{recipe.description.slice(0, 100)}...</p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeContainer;
