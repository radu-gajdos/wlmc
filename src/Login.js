import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(""); // State variable for error message

    const [logedIn, setlogedIn] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make API request to login user
            const response = await axios.post(
                "http://localhost:5000/api/users/login",
                formData
            );

            // Handle successful login
            console.log(response.data); // Log the response from the server

            setlogedIn(true);

            // Save JWT token to local storage
            localStorage.setItem("token", response.data.token);

            // Redirect or perform any other action after successful login
        } catch (error) {
            // Handle login errors
            console.error("An error occurred:", error);
            if (error.response && error.response.data) {
                // If response contains error message, set the error message state
                setErrorMessage(error.response.data.message);
            } else {
                // If no error message provided by server, set a generic error message
                setErrorMessage("An error occurred during login.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-semibold mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 mb-4">{errorMessage}</div>
                    )}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-secondary hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                        {logedIn && <Navigate to="/explore" />}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
