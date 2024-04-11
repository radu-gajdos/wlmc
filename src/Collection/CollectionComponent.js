import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook
import RecipeContainer from "../Recipe/RecipeContainer"; // Import RecipeContainer component
import Navigation from "../Layout/Navigation";
import Spinner from "../Layout/Spinner";

/**
 * Component for displaying a collection.
 * @returns {JSX.Element} The CollectionComponent component.
 */
const CollectionComponent = () => {
    // Extract collectionId from URL parameters
    const { collectionId } = useParams();
    // State variable for the collection
    const [collection, setCollection] = useState();

    // Fetch the collection
    useEffect(() => {
        // Fetch the collection with the given collectionId
        const fetchCollection = async () => {
            try {
                // GET request to fetch the collection
                const response = await axios.get(
                    `http://localhost:5000/api/collections/${collectionId}`
                );
                setCollection(response.data);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
        fetchCollection();
    }, [collectionId]); // collectionId is used as a dependency

    // Display a spinner while the collection is being fetched
    if (!collection) {
        return <Spinner />;
    }

    return (
        <div>
            <Navigation />
            <div className="max-w-6xl mx-auto p-4">
                <h1 className="text-3xl font-semibold mb-6">
                    {collection.name}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {collection.recipes.map((recipeId) => (
                        <RecipeContainer key={recipeId} recipeId={recipeId} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionComponent;
