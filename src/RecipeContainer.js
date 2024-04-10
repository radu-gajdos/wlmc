import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import RecipeAverageRating from "./RecipeAverageRating";

const RecipeContainer = ({ recipeId }) => {
    const [recipe, setRecipe] = useState(null);
    const [authorName, setAuthorName] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/recipes/${recipeId}`
                );
                setRecipe(response.data);

                // Fetch the author name
                const authorId = response.data.author;
                const authorNameResponse = await axios.get(
                    `http://localhost:5000/api/users/${authorId}/username`
                );
                setAuthorName(authorNameResponse.data.username);
                
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
        fetchRecipe();
    }, [recipeId]);

    if (!recipe || !authorName) {
        return <div>Loading...</div>;
    }

    return (
        <Link to={`/recipes/${recipe._id}`} style={{ textDecoration: "none" }}>
            <div className="relative max-w-sm mx-auto bg-transparent shadow-md rounded-lg overflow-hidden mb-4">
                <div className="relative w-full h-40">
                    <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-50"></div>
                </div>

                <div className="absolute bottom-0 right-0 m-4 px-2 py-1 bg-gray-100 rounded-lg mt-5">
                    <p className="text-xs font-semibold">by {authorName}</p>
                </div>
                <div className="absolute top-0 right-0 m-4 bg-transparent text-black px-2 py-1">
                    <RecipeAverageRating recipeId={recipe._id} />
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                        {recipe.title}
                    </h2>
                    <p className="text-gray-600">
                        {recipe.description.slice(0, 100)}...
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default RecipeContainer;
