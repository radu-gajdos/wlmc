import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from React Router
import Navigation from "./Navigation";

const UserCollections = () => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "http://localhost:5000/api/collections",
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
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
                <div className="bg-secondary rounded-md flex items-center justify-center h-12">
                    <Link
                        to="/create-collection"
                        className="text-white px-6 py-3 rounded-md inline-block shadow-md hover:bg-opacity-80 transition duration-300"
                    >
                        Create Collection
                    </Link>
                </div>
                <br />
                {collections.map((collection) => (
                    <div
                        key={collection._id}
                        className="bg-forth mb-4 border border-gray-200 p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
                    >
                        {/* Make the collection name clickable */}
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
