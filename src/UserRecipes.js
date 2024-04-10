import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RecipeContainer from "./RecipeContainer";
import Navigation from "./Navigation";

const UserRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/recipes"
                );
                setRecipes(response.data);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };

        fetchUserRecipes();
    }, []);

    return (
        <div>
            <Navigation />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-semibold mb-4">My Recipes</h1>
                <div className="mt-4">
                    <Link
                        to="/create-recipe"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Create Recipe
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recipes.map((recipe) => (
                        <RecipeContainer key={recipe._id} recipeId={recipe._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserRecipes;
