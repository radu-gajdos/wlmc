import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex-shrink-0 text-white mr-6">
                        <span className="font-semibold text-xl">WhoLetMeCook</span>
                    </div>
                    <div className="hidden md:block">
                        <Link
                            to="/home"
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium mr-4"
                        >
                            Home
                        </Link>
                        <Link
                            to="/explore"
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium mr-4"
                        >
                            Explore
                        </Link>
                        <Link
                            to="/profile"
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium mr-4"
                        >
                            Profile
                        </Link>
                    </div>
                    {user && (
                        <div className="text-white">Hello, {user.username}</div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
