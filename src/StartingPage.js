import React from 'react';
import { Link } from 'react-router-dom';

function StartingPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">Welcome</h2>
        <div className="flex justify-center">
          <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline">
            Login
          </Link>
          <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StartingPage;
