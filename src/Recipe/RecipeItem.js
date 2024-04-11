import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navigation from "../Layout/Navigation";
import RecipeRating from "../Rating/RecipeRating";
import RecipeAverageRating from "../Rating/RecipeAverageRating";
import RecipeReviews from "../Review/RecipeReviews";
import Spinner from "../Layout/Spinner";
/**
 * Component for displaying a recipe's details and other functionality like adding it to a collection.
 * @returns {JSX.Element} The RecipeItem component.
 */
const RecipeItem = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [authorName, setAuthorName] = useState("");
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [inCollection, setInCollection] = useState(false);

    // Fetch the recipe and collections when the component mounts
    useEffect(() => {
        const fetchRecipeAndCollections = async () => {
            try {
                // Fetch the recipe
                const recipeResponse = await axios.get(
                    `http://localhost:5000/api/recipes/${recipeId}`
                );
                // Set the recipe state to the fetched recipe
                setRecipe(recipeResponse.data);

                // Fetch the author name
                const authorId = recipeResponse.data.author;
                const authorNameResponse = await axios.get(
                    `http://localhost:5000/api/users/${authorId}/username`
                );
                // Set the author name state to the fetched author name
                setAuthorName(authorNameResponse.data.username);

                // Fetch all collections
                const collectionsResponse = await axios.get(
                    `http://localhost:5000/api/collections`
                );
                let allCollections = collectionsResponse.data;

                // Fetch the authenticated user's profile
                const userProfileResponse = await axios.get(
                    `http://localhost:5000/api/users/profile`,
                    {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    }
                );
                // Get the authenticated user's ID
                const userId = userProfileResponse.data._id;

                // Filter collections to only include those where the userId matches
                allCollections = allCollections.filter(
                    (collection) => collection.owner == userId
                );

                // Set the collections state to the fetched collections
                setCollections(allCollections);

                // Check if the recipe is in any of the collections
                const foundCollection = allCollections.find((collection) =>
                    collection.recipes.includes(recipeId)
                );

                // If the recipe is in a collection, set the selected collection and inCollection states
                if (foundCollection) {
                    setSelectedCollection(foundCollection._id);
                    setInCollection(true);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };

        fetchRecipeAndCollections();
    }, [recipeId]);

    // Function to add a recipe to a collection
    const handleAddToCollection = async () => {
        try {
            // Post request to add the recipe to the selected collection
            const response = await axios.post(
                `http://localhost:5000/api/collections/${selectedCollection}/add-recipe/${recipeId}`
            );
            setSuccessMessage(response.data.message);
            setErrorMessage("");
            setInCollection(true);
            setSelectedCollection("");
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setSuccessMessage("");
        }
    };

    // Function to remove a recipe from a collection
    const handleRemoveFromCollection = async () => {
        try {
            // Check if a collection is selected
            if (!selectedCollection) {
                setErrorMessage("Please select a collection");
                return;
            }

            // Delete request to remove the recipe from the selected collection
            const response = await axios.delete(
                `http://localhost:5000/api/collections/${selectedCollection}/remove-recipe/${recipeId}`
            );
            setSuccessMessage(response.data.message);
            setErrorMessage("");
            setInCollection(false);
            setSelectedCollection("");
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setSuccessMessage("");
        }
    };

    if (!recipe || !authorName) {
        return <Spinner />;
    }

    // Function to get the YouTube video ID from a URL
    function getYouTubeId(url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[7].length === 11 ? match[7] : "";
    }

    return (
        <div>
            <Navigation />
            <div className="container mx-auto p-4">
                <div className="flex flex-wrap justify-between items-start mt-9 mb-9">
                    <div className="w-full md:w-2/3">
                        <div>
                            <div className="mt-3 flex">
                                <h1 className="text-3xl font-semibold mb-4 text-primary inline">
                                    {recipe.title}
                                </h1>
                                <div className="ml-5">
                                    <RecipeAverageRating recipeId={recipeId} />
                                </div>
                            </div>

                            <RecipeRating recipeId={recipeId} />
                        </div>
                        <div className="mb-6 mt-3">
                            <h2 className="text-xl font-semibold mb-2 text-secondary">
                                Description
                            </h2>
                            <p className="text-gray-800">
                                {recipe.description}
                            </p>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-secondary">
                                Ingredients
                            </h2>
                            <ul className="list-disc pl-4">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className="text-gray-800">
                                        {ingredient.quantity} {ingredient.unit}{" "}
                                        {ingredient.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-secondary">
                                Instructions
                            </h2>
                            <ol className="list-decimal pl-4">
                                {recipe.instructions.map(
                                    (instruction, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-800"
                                        >
                                            {instruction}
                                        </li>
                                    )
                                )}
                            </ol>
                        </div>
                        <div className="mb-6">
                            <p className="text-xl font-semibold text-secondary">
                                Cooking Time: {recipe.cookingTime} minutes
                            </p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-secondary">
                                Author: {authorName}
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 flex flex-col items-end">
                        <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="rounded-lg mb-6 object-cover"
                            style={{ width: "400px", height: "300px" }}
                        />

                        <div className="mt-4">
                            {!inCollection ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Add to Collection:
                                    </label>
                                    <select
                                        className="w-full mt-1 p-2 border-gray-300 rounded-md"
                                        value={selectedCollection}
                                        onChange={(e) =>
                                            setSelectedCollection(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select a collection
                                        </option>
                                        {collections.map((collection) => (
                                            <option
                                                key={collection._id}
                                                value={collection._id}
                                            >
                                                {collection.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="mt-2 bg-primary text-white px-4 py-2 rounded-md"
                                        onClick={handleAddToCollection}
                                    >
                                        Add to Collection
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="mt-2 bg-secondary text-white px-4 py-2 rounded-md"
                                        onClick={handleRemoveFromCollection}
                                    >
                                        Remove from Collection
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {recipe.videoUrl && (
                    <div className="w-full mb-6">
                        <iframe
                            className="w-full h-96 rounded-lg"
                            src={`https://www.youtube.com/embed/${getYouTubeId(
                                recipe.videoUrl
                            )}`}
                            title="Recipe Video"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
                <div>
                    <RecipeReviews recipeId={recipeId} />
                </div>
            </div>
        </div>
    );
};

export default RecipeItem;
