import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigation";
import RecipeRating from "./RecipeRating";
import RecipeAverageRating from "./RecipeAverageRating";

const RecipeItem = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [authorName, setAuthorName] = useState("");
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [inCollection, setInCollection] = useState(false);

    useEffect(() => {
        const fetchRecipeAndCollections = async () => {
            try {
                // Fetch the recipe details
                const recipeResponse = await axios.get(
                    `http://localhost:5000/api/recipes/${recipeId}`
                );
                setRecipe(recipeResponse.data);

                // Fetch the author name
                const authorId = recipeResponse.data.author;
                const authorNameResponse = await axios.get(
                    `http://localhost:5000/api/users/${authorId}/username`
                );
                setAuthorName(authorNameResponse.data.username);

                // Fetch all collections
                const collectionsResponse = await axios.get(
                    `http://localhost:5000/api/collections`
                );
                const allCollections = collectionsResponse.data;
                setCollections(allCollections);

                // Find the collection that contains the recipe
                const foundCollection = allCollections.find((collection) =>
                    collection.recipes.includes(recipeId)
                );
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

    const handleAddToCollection = async () => {
        try {
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

    const handleRemoveFromCollection = async () => {
        try {
            if (!selectedCollection) {
                setErrorMessage("Please select a collection");
                return;
            }

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
        return <div>Loading...</div>;
    }

    function getYouTubeId(url) {
        /* eslint-disable */
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        /* eslint-enable */
        const match = url.match(regExp);
        return match && match[7].length === 11 ? match[7] : "";
    }

    return (
        <div>
            <Navigation />
            <div className="container mx-auto p-4 flex flex-wrap mt-9 mb-9">
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-semibold mb-4">
                        {recipe.title}
                    </h1>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            Description
                        </h2>
                        <p className="text-gray-800">{recipe.description}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
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
                        <h2 className="text-xl font-semibold mb-2">
                            Instructions
                        </h2>
                        <ol className="list-decimal pl-4">
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index} className="text-gray-800">
                                    {instruction}
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-800">
                            Cooking Time: {recipe.cookingTime} minutes
                        </p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-800">
                            Author: {authorName}
                        </p>
                    </div>
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
                                        setSelectedCollection(e.target.value)
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
                                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                                    onClick={handleAddToCollection}
                                >
                                    Add to Collection
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button
                                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
                                    onClick={handleRemoveFromCollection}
                                >
                                    Remove from Collection
                                </button>
                            </div>
                        )}
                        {successMessage && (
                            <p className="text-green-500 mt-2">
                                {successMessage}
                            </p>
                        )}
                        {errorMessage && (
                            <p className="text-red-500 mt-2">{errorMessage}</p>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-end">
                    <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="rounded-lg mb-6 object-cover"
                        style={{ width: "400px", height: "300px" }}
                    />
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
                <div className="mt-4">
                    <RecipeRating recipeId={recipeId} />
                </div>
                <div className="mt-4">
                    <RecipeAverageRating recipeId={recipeId}/>
                </div>
            </div>
        </div>
    );
};

export default RecipeItem;
