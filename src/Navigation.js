import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

const Navigation = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
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
                setUser(response.data);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <nav className="bg-forth py-4 shadow-md">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <Link
                    to="/"
                    className=" font-semibold text-lg"
                >
                    WhoLetMeCook
                </Link>
                <div className="flex gap-6">
                    <Link
                        to="/explore"
                        className=" bg-secondary hover:bg-orange-400 px-4 py-2 rounded-md transition duration-300 text-forth"
                    >
                        Explore
                    </Link>
                    <Link
                        to="/user-recipes"
                        className=" bg-secondary hover:bg-orange-400 px-4 py-2 rounded-md transition duration-300 text-forth"
                    >
                        My Recipes
                    </Link>
                    <Link
                        to="/collections"
                        className=" bg-secondary hover:bg-orange-400 px-4 py-2 rounded-md transition duration-300 text-forth"
                    >
                        My Collections
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
