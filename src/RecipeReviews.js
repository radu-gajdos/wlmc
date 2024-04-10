import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeReviews = ({ recipeId }) => {
    const [reviews, setReviews] = useState([]);
    const [userId, setUserId] = useState([]);
    const [newReviewContent, setNewReviewContent] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/reviews/${recipeId}`
                );
                const reviewsWithUsername = await Promise.all(
                    response.data.map(async (review) => {
                        const authorNameResponse = await axios.get(
                            `http://localhost:5000/api/users/${review.user}/username`
                        );
                        review.username = authorNameResponse.data.username;
                        return review;
                    })
                );
                setReviews(reviewsWithUsername);
            } catch (error) {
                setError("Error fetching reviews");
            }

            const userProfileResponse = await axios.get(
                `http://localhost:5000/api/users/profile`,
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                }
            );
            setUserId(userProfileResponse.data._id);
        };
        fetchReviews();
    }, [recipeId]);

    const handleAddReview = async () => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/reviews/${recipeId}`,
                { content: newReviewContent, user: userId },
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const newReview = response.data;
            const authorNameResponse = await axios.get(
                `http://localhost:5000/api/users/${newReview.user}/username`
            );
            newReview.username = authorNameResponse.data.username;
            setReviews([...reviews, newReview]);
            setNewReviewContent("");
        } catch (error) {
            setError("Error adding review");
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await axios.delete(`http://localhost:5000/api/review/${reviewId}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            });
            setReviews(reviews.filter((review) => review._id !== reviewId));
        } catch (error) {
            setError("Error deleting review");
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            <div className="mb-4">
                <textarea
                    value={newReviewContent}
                    onChange={(e) => setNewReviewContent(e.target.value)}
                    placeholder="Write your review here..."
                    className="w-full h-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button
                    onClick={handleAddReview}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Add Review
                </button>
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
            <div>
                {reviews.map(
                    (review) => (
                        (
                            <div
                                key={review._id}
                                className="mb-4 p-4 bg-white shadow-md rounded-lg"
                            >
                                <p className="text-gray-800">
                                    {review.content}
                                </p>
                                <p className="text-gray-600">
                                    By: {review.username}
                                </p>
                                {review.user === userId && (
                                    <button
                                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                        onClick={() =>
                                            handleDeleteReview(review._id)
                                        }
                                    >
                                        Delete Review
                                    </button>
                                )}
                            </div>
                        )
                    )
                )}
            </div>
        </div>
    );
};

export default RecipeReviews;
