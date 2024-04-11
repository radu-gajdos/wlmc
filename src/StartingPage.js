import React from 'react';
import { Link } from 'react-router-dom';

function StartingPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold text-center">Welcome</h2>
        <h4 className="text-lg  text-center">to</h4>
        <h1 className=" font-bold mb-6 text-center">
          <span className="text-4xl text-primary">Who</span>
          <span className="text-4xl text-secondary">Let</span>
          <span className="text-4xl text-primary">Me</span>
          <span className="text-4xl text-secondary">Cook</span>
        </h1> 
        <h3 className="text-lg mb-6 text-center">Please login or register to continue</h3>
        <div className="flex justify-center">
          <Link to="/login" className="bg-secondary hover:bg-orange-400 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline">
            Login
          </Link>
          <Link to="/register" className="bg-primary hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StartingPage;
