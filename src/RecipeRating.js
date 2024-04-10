import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeRating = ({ recipeId }) => {
    const [userRatingValue, setuserRatingValue] = useState(null);
    const [userRating, setuserRating] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchUserRating = async () => {
            try {
                // Fetch user's rating for the recipe
                const userRatingResponse = await axios.get(
                    `http://localhost:5000/api/ratings/${recipeId}`
                );
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
                const userId = userProfileResponse.data._id;
                
                // Filter the ratings to get the one that belongs to the authenticated user
                const userRating = ratings.find(rating => rating.user === userId);
                

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

    const handleRatingChange = async (rating) => {
        try {
            // Check if the user has already rated the recipe
            if (userRating !== null) {
                // Update the existing rating
                await axios.put(
                    `http://localhost:5000/api/ratings/${userRating._id}`,
                    { value: rating },
                    {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    }
                );
                setSuccessMessage("Rating updated successfully");
                setuserRatingValue(rating); // Update user's rating in the UI
            } else {
                // Submit a new rating
                await axios.post(
                    `http://localhost:5000/api/ratings/${recipeId}`,
                    { value: rating },
                    {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    }
                );
                setSuccessMessage("Rating submitted successfully");
                setuserRatingValue(rating); // Update user's rating in the UI
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
                        i <= userRatingValue ? "text-yellow-500" : "text-gray-400"
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
