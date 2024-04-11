import React from "react";
import { Link } from "react-router-dom";

/**
 * Component for displaying the navbar.
 * @returns {JSX.Element} The Navigation component.
 */
const Navigation = () => {
    return (
        <nav className="bg-forth py-4 shadow-md">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <Link to="/" className=" font-semibold text-lg">
                    <span className="text-2xl text-primary">Who</span>
                    <span className="text-2xl text-secondary">Let</span>
                    <span className="text-2xl text-primary">Me</span>
                    <span className="text-2xl text-secondary">Cook</span>
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
