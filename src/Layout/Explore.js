import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import RecipeContainer from "../Recipe/RecipeContainer"; // Import the RecipeContainer component
import Navigation from "./Navigation";

/**
 * Component for displaying all the recipes in pages.
 * @returns {JSX.Element} The ExploreRecipes component.
 */
const ExploreRecipes = () => {
    // State variables for the recipes, current page, and recipes per page
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 12;

    // Fetch all recipes and their average ratings
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                // GET request to fetch all recipes
                const response = await axios.get(
                    "http://localhost:5000/api/recipes"
                );
                // GET request to fetch all ratings for each recipe
                const recipesWithAverageRating = await Promise.all(
                    response.data.map(async (recipe) => {
                        const ratingsResponse = await axios.get(
                            `http://localhost:5000/api/ratings/${recipe._id}`
                        );
                        const ratings = ratingsResponse.data;
                        const totalRating = ratings.reduce(
                            (acc, curr) => acc + curr.value,
                            0
                        );
                        const averageRating =
                            ratings.length > 0
                                ? totalRating / ratings.length
                                : 0;
                        return { ...recipe, averageRating };
                    })
                );
                // Sort recipes based on average rating
                const sortedRecipes = recipesWithAverageRating.sort(
                    (a, b) => b.averageRating - a.averageRating
                );
                // Set the recipes state
                setRecipes(sortedRecipes);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
        fetchRecipes();
    }, []);

    // Logic to paginate recipes
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    return (
        <Fragment>
            <Navigation />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-semibold mb-4">Explore Recipes</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentRecipes.map((recipe) => (
                        <RecipeContainer
                            key={recipe._id}
                            recipeId={recipe._id}
                        />
                    ))}
                </div>
                {/* Pagination */}
                <div className="mt-4">
                    {Array.from({
                        length: Math.ceil(recipes.length / recipesPerPage),
                    }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className="mr-2 px-3 py-1 bg-gray-200 rounded-md"
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export default ExploreRecipes;
