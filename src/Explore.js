import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import RecipeContainer from "./RecipeContainer"; // Import the RecipeContainer component
import Navigation from "./Navigation";

const ExploreRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 12;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/recipes"
                );
                setRecipes(response.data);
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
