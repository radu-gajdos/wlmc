import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeItem = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/recipes/${recipeId}`
                );
                console.log(recipe);
                setRecipe(response.data);
                fetchUserData(response.data.author);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };

        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/users/profile`,
                    {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    }
                );
                setAuthor(response.data);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
        fetchRecipe();
    }, [recipeId]);

    if (!recipe || !author) {
        return <div>Loading...</div>;
    }

    function getYouTubeId(url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[7].length === 11 ? match[7] : "";
    }

    return (
        <div className="container mx-auto p-4 flex flex-wrap mt-9 mb-9">
            <div className="w-full md:w-1/2">
                <h1 className="text-3xl font-semibold mb-4">{recipe.title}</h1>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    <p>{recipe.description}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.quantity} {ingredient.unit}{" "}
                                {ingredient.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Instructions</h2>
                    <ol>
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </div>
                <div className="mb-4">
                    <p className="text-xl font-semibold">
                        Cooking Time: {recipe.cookingTime} minutes
                    </p>
                </div>
                <div className="mb-4">
                    <p className="text-lg font-semibold">
                        Author: {author.username}
                    </p>
                </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-end">
                <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="rounded-lg mb-4 object-cover"
                    style={{ width: "400px", height: "300px" }}
                />
            </div>
            {recipe.videoUrl && (
                <div className="mb-4 w-full">
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
        </div>
    );
};

export default RecipeItem;
