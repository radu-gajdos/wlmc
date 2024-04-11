import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from React Router
import Navigation from "../Layout/Navigation";

/**
 * Component for displaying the collections of the authenticated user.
 * @returns {JSX.Element} The UserCollections component.
 */
const UserCollections = () => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchCollections = async () => {
            // Fetch the collections of the authenticated user
            try {
                const token = localStorage.getItem("token");
                // Fetch the collections
                const response = await axios.get(
                    "http://localhost:5000/api/collections",
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                // Set the collections state to the fetched collections
                setCollections(response.data);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
        fetchCollections();
    }, []);

    return (
        <div>
            <Navigation />
            <div className="max-w-xl mx-auto p-4">
                <h1 className="text-3xl font-semibold mb-4">My Collections</h1>
                <Link
                    to="/create-collection"
                    className="bg-secondary mb-5 text-white hover:bg-orange-400 px-6 py-3 rounded-md inline-block shadow-md hover:bg-opacity-80 transition duration-300"
                >
                    Create Collection
                </Link>
                <br />
                {collections.map((collection) => (
                    <div
                        key={collection._id}
                        className="bg-forth mb-4 border border-gray-200 p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
                    >
                        <Link
                            to={`/collection/${collection._id}`}
                            className="hover:underline"
                        >
                            <h2 className="text-xl font-semibold">
                                {collection.name}
                            </h2>
                        </Link>
                        <p className="text-gray-600 mt-2">
                            Number of recipes: {collection.recipes.length}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserCollections;
