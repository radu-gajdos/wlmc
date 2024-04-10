import React, { useState } from "react";
import axios from "axios";

const CollectionCreator = () => {
  const [formData, setFormData] = useState({
    name: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/collections", formData, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      });
      console.log("Collection created successfully:", response.data);
      // Optionally, redirect the user to another page after successful creation
    } catch (error) {
      console.error("Error creating collection:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Create New Collection</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Create Collection
        </button>
      </form>
    </div>
  );
};

export default CollectionCreator;