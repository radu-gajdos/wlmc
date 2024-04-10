import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes, not Route
import StartingPage from "./StartingPage";
import Login from "./Login";
import Register from "./Register";
import Explore from "./Explore";
import RecipeItem from "./RecipeItem";
import RecipeCreator from "./RecipeCreator";
import CollectionCreator from "./CollectionCreator";
import UserCollections from "./UserCollections";
import CollectionComponent from "./CollectionComponent";
import UserRecipes from "./UserRecipes";
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
