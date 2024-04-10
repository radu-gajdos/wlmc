import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RecipeContainer from "./RecipeContainer";
import Navigation from "./Navigation";

// Define colors
const colors = {
    primary: '#606C38',
    secondary: '#DDA15E',
    third: '#283618',
};

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
        <Fragment>
            <Navigation />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-6">My Recipes</h1>
                <div className="mb-6">
                    <Link
                        to="/create-recipe"
                        className="bg-secondary text-white px-6 py-3 rounded-md inline-block shadow-md hover:bg-opacity-80 transition duration-300"
                    >
                        Create Recipe
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <RecipeContainer key={recipe._id} recipeId={recipe._id} />
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export default UserRecipes;
