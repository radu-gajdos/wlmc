import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import RecipeAverageRating from "../Rating/RecipeAverageRating";
import Spinner from "../Layout/Spinner";

/**
 * Component for displaying the recipe in a short form.
 * @returns {JSX.Element} The RecipeContainer component.
 */
const RecipeContainer = ({ recipeId }) => {
    // State variables for the recipe and author name
    const [recipe, setRecipe] = useState(null);
    const [authorName, setAuthorName] = useState(null);

    // Fetch the recipe and author name
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                // GET request to fetch the recipe
                const response = await axios.get(
                    `http://localhost:5000/api/recipes/${recipeId}`
                );
                // Set the recipe state
                setRecipe(response.data);

                // GET request to fetch the author name
                const authorId = response.data.author;
                const authorNameResponse = await axios.get(
                    `http://localhost:5000/api/users/${authorId}/username`
                );
                // Set the author name state
                setAuthorName(authorNameResponse.data.username);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
        fetchRecipe();
    }, [recipeId]);

    // Display a spinner while the recipe and author name are being fetched
    if (!recipe || !authorName) {
        return <Spinner />;
    }

    return (
        <Link to={`/recipes/${recipe._id}`} style={{ textDecoration: "none" }}>
            <div className="relative max-w-sm mx-auto bg-forth shadow-md rounded-lg overflow-hidden mb-4">
                <div className="relative w-full h-40">
                    <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-50"></div>
                </div>
                <div className="absolute bottom-0 right-0 m-4 px-2 py-1 bg-secondary rounded-lg">
                    <p className="text-xs font-semibold text-forth">
                        by {authorName}
                    </p>
                </div>
                <div className="absolute top-0 right-0 m-4 bg-transparent text-black px-2 py-1">
                    <RecipeAverageRating recipeId={recipe._id} />
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                        {recipe.title}
                    </h2>
                    <p className="text-gray-600">
                        {recipe.description.slice(0, 100)}...
                    </p>
                </div>
                <br />
            </div>
        </Link>
    );
};

export default RecipeContainer;
