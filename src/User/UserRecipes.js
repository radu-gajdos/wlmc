import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RecipeContainer from "../Recipe/RecipeContainer";
import Navigation from "../Layout/Navigation";


/**
 * Component for displaying the recipes of the authenticated user.
 * @returns {JSX.Element} The UserRecipes component.
 */
const UserRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        /**
         * Fetches the recipes of the authenticated user.
         */
        const fetchUserRecipes = async () => {
            try {
                // Fetch all recipes
                const response = await axios.get(
                    "http://localhost:5000/api/recipes"
                );

                // Fetch the authenticated user's profile
                const userProfileResponse = await axios.get(
                    `http://localhost:5000/api/users/profile`,
                    {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    }
                );
                // Save the authenticated user's ID
                const userId = userProfileResponse.data._id;

                // Filter the recipes to get the ones that belong to the authenticated user based on the user ID
                const userRecipes = response.data.filter(
                    (recipe) => recipe.author === userId
                );

                // Set the recipes state to the filtered recipes
                setRecipes(userRecipes);
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
                        className="bg-secondary hover:bg-orange-400 text-white px-6 py-3 rounded-md inline-block shadow-md hover:bg-opacity-80 transition duration-300"
                    >
                        Create Recipe
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <RecipeContainer
                            key={recipe._id}
                            recipeId={recipe._id}
                        />
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export default UserRecipes;
