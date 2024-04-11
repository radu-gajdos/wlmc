import React, { useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";

const CollectionCreator = () => {
    const [formData, setFormData] = useState({
        name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/collections",
                formData,
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log("Collection created successfully:", response.data);
            window.location.href = "/collections";
        } catch (error) {
            console.error("Error creating collection:", error);
            // Optionally, display an error message to the user
        }
    };

    return (
        <div>
            <Navigation />
            <div className="mt-10 max-w-md mx-auto p-4 bg-forth rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-primary-light mb-4">
                    Create New Collection
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-primary-light"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-secondary hover:bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:bg-primary-dark"
                    >
                        Create Collection
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CollectionCreator;
