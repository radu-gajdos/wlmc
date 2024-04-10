import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const RecipeAverageRating = ({ recipeId }) => {
    const [averageRating, setAverageRating] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                // Fetch all ratings for the recipe
                const response = await axios.get(
                    `http://localhost:5000/api/ratings/${recipeId}`
                );
                const ratings = response.data;

                // Calculate the average rating
                if (ratings.length > 0) {
                    const totalRating = ratings.reduce(
                        (accumulator, currentRating) =>
                            accumulator + currentRating.value,
                        0
                    );
                    const average = totalRating / ratings.length;
                    setAverageRating(average.toFixed(1));
                } else {
                    setAverageRating(0);
                }
                setLoading(false);
            } catch (error) {
                setError("Error fetching average rating");
                setLoading(false);
            }
        };

        fetchAverageRating();
    }, [recipeId]);

    let boxContent = null;
    let boxStyle = null;
    if (averageRating !== null && averageRating > 0) {
        let boxColor = "#000";
        if (averageRating >= 4.5) {
            boxColor = "#4CAF50"; // Green for high ratings
        } else if (averageRating >= 4) {
            boxColor = "#8BC34A"; // Light green
        } else if (averageRating >= 3.5) {
            boxColor = "#CDDC39"; // Lime
        } else if (averageRating >= 3) {
            boxColor = "#FFC107"; // Yellow for moderate ratings
        } else if (averageRating >= 2.5) {
            boxColor = "#FF9800"; // Orange
        } else if (averageRating >= 2) {
            boxColor = "#FF5722"; // Deep orange
        } else if (averageRating >= 1.5) {
            boxColor = "#FF5252"; // Pink
        } else if (averageRating >= 1) {
            boxColor = "#E91E63"; // Pink
        } else if (averageRating >= 0.5) {
            boxColor = "#9C27B0"; // Purple
        }

        boxStyle = {
            backgroundColor: boxColor,
            padding: "10px",
            borderRadius: "8px",
            color: "#fff",
            display: "inline-block",
            fontWeight: "bold",
        };

        boxContent = <div style={boxStyle}>{averageRating}</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <div>{boxContent}</div>;
};

export default RecipeAverageRating;
