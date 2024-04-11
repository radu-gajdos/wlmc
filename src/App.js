import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes, not Route
import StartingPage from "./Layout/StartingPage";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Explore from "./Layout/Explore";
import RecipeItem from "./Recipe/RecipeItem";
import RecipeCreator from "./Recipe/RecipeCreator";
import CollectionCreator from "./Collection/CollectionCreator";
import UserCollections from "./User/UserCollections";
import CollectionComponent from "./Collection/CollectionComponent";
import UserRecipes from "./User/UserRecipes";
function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<StartingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/recipes/:recipeId" element={<RecipeItem />} />
                <Route path="/create-recipe" element={<RecipeCreator />} />
                <Route path="/create-collection" element={<CollectionCreator />} />
                <Route path="/collections" element={<UserCollections />} />
                <Route path="/collection/:collectionId" element={<CollectionComponent />} />
                <Route path="/user-recipes" element={<UserRecipes />} />
            </Routes>
        </Router>
    );
}

export default App;
