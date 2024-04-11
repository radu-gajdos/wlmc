import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const largeScreenNav = (
        <nav className="bg-forth py-4 shadow-md">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <Link to="/" className="font-semibold text-lg">
                    <span className="text-2xl text-primary">Who</span>
                    <span className="text-2xl text-secondary">Let</span>
                    <span className="text-2xl text-primary">Me</span>
                    <span className="text-2xl text-secondary">Cook</span>
                </Link>
                <div className="flex gap-6">
                    <Link
                        to="/explore"
                        className="bg-secondary hover:bg-orange-400 px-4 py-2 rounded-md transition duration-300 text-forth"
                    >
                        Explore
                    </Link>
                    <Link
                        to="/user-recipes"
                        className="bg-secondary hover:bg-orange-400 px-4 py-2 rounded-md transition duration-300 text-forth"
                    >
                        My Recipes
                    </Link>
                    <Link
                        to="/collections"
                        className="bg-secondary hover:bg-orange-400 px-4 py-2 rounded-md transition duration-300 text-forth"
                    >
                        My Collections
                    </Link>
                </div>
            </div>
        </nav>
    );

    const smallScreenNav = (
        <nav className="bg-forth py-4 shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="font-semibold text-lg">
                        <span className="text-2xl text-primary">Who</span>
                        <span className="text-2xl text-secondary">Let</span>
                        <span className="text-2xl text-primary">Me</span>
                        <span className="text-2xl text-secondary">Cook</span>
                    </Link>
                    <div onClick={toggleMenu} className="md:hidden">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
                <div className={`md:flex flex-col ${isOpen ? "block" : "hidden"}`}>
                    <Link
                        to="/explore"
                        className="bg-secondary hover:bg-orange-400 px-4 py-2 rounded-md transition duration-300 text-forth block w-full mb-2"
                    >
                        Explore
                    </Link>
                    <Link
                        to="/user-recipes"
                        className="bg-secondary hover:bg-orange-400 px-4 py-2 rounded-md transition duration-300 text-forth block w-full mb-2"
                    >
                        My Recipes
                    </Link>
                    <Link
                        to="/collections"
                        className="bg-secondary hover:bg-orange-400 px-4 py-2 rounded-md transition duration-300 text-forth block w-full"
                    >
                        My Collections
                    </Link>
                </div>
            </div>
        </nav>
    );

    return (
        <>
            {window.innerWidth > 768 ? largeScreenNav : smallScreenNav}
        </>
    );
};

export default Navigation;
