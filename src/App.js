import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes, not Route
import StartingPage from "./StartingPage";
import Login from "./Login";
import Register from "./Register";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<StartingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
