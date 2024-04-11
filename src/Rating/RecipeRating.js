import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * Component for displaying the personal rating of a recipe and actually rating it.
 * @returns {JSX.Element} The RecipeRating component.
 */
const RecipeRating = ({ recipeId }) => {
    // State variables for the user's rating value and rating object
    const [userRatingValue, setuserRatingValue] = useState(null);
    const [userRating, setuserRating] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch the user's rating for the recipe
    useEffect(() => {
        const fetchUserRating = async () => {
            try {
                // Fetch user's rating for the recipe
                const userRatingResponse = await axios.get(
                    `http://localhost:5000/api/ratings/${recipeId}`
                );
                // Extract the ratings from the response
                const ratings = userRatingResponse.data;

                // Fetch the authenticated user's profile
                const userProfileResponse = await axios.get(
                    `http://localhost:5000/api/users/profile`,
                    {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    }
                );
                // Extract the user ID from the response
                const userId = userProfileResponse.data._id;

                // Filter the ratings to get the one that belongs to the authenticated user
                const userRating = ratings.find(
                    (rating) => rating.user === userId
                );

                // Set the user's rating value and rating object
                if (userRating) {
                    setuserRatingValue(userRating.value);
                    setuserRating(userRating);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };

        fetchUserRating();
    }, [recipeId]);

    // Handle rating change
    const handleRatingChange = async (rating) => {
        try {
            // Check if the user has already rated the recipe
            if (userRating !== null) {
                // Update the existing rating
                // PUT request to update the rating
                await axios.put(
                    `http://localhost:5000/api/ratings/${userRating._id}`,
                    { value: rating },
                    {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    }
                );
                // Display a success message
                setSuccessMessage("Rating updated successfully");
                // Update user's rating in the UI
                setuserRatingValue(rating);
            } else {
                // Submit a new rating
                // POST request to create a new rating
                await axios.post(
                    `http://localhost:5000/api/ratings/${recipeId}`,
                    { value: rating },
                    {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    }
                );
                // Display a success message
                setSuccessMessage("Rating submitted successfully");
                // Update user's rating in the UI
                setuserRatingValue(rating);
            }
        } catch (error) {
            setErrorMessage("Failed to submit rating");
            console.error("An error occurred:", error);
        }
    };

    // Rating UI component
    const renderRating = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`cursor-pointer ${
                        i <= userRatingValue
                            ? "text-yellow-500"
                            : "text-gray-400"
                    }`}
                    onClick={() => handleRatingChange(i)}
                >
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="flex items-center">
            <span className="mr-2 text-lg font-semibold">
                Rate this recipe:
            </span>
            {renderRating()}
            {successMessage && (
                <p className="text-green-500 ml-2">{successMessage}</p>
            )}
            {errorMessage && (
                <p className="text-red-500 ml-2">{errorMessage}</p>
            )}
        </div>
    );
};

export default RecipeRating;
