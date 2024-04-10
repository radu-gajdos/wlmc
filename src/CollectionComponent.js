import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook
import RecipeContainer from "./RecipeContainer"; // Import RecipeContainer component
import Navigation from "./Navigation";

const CollectionComponent = () => {
  const { collectionId } = useParams(); // Extract collectionId from URL parameters
  const [collection, setCollection] = useState();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/collections/${collectionId}`);
        setCollection(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchCollection();
  }, [collectionId]); // collectionId is used as a dependency

  if (!collection) {
    return <div className="max-w-xl mx-auto p-4">Loading...</div>;
  }

  return (
    <div>
      <Navigation />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">{collection.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collection.recipes.map(recipeId => (
            <RecipeContainer key={recipeId} recipeId={recipeId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionComponent;
