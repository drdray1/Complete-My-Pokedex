import React from "react";

import BrowseAllPokemon from "./BrowseAllPokemon";
import Home from "./Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompletePokedex from "./CompletePokedex";
import StickyFooter from "./StickyFooter";
import ResponsiveAppBar from "./ResponsiveAppBar";

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowseAllPokemon />} />
        <Route path="/complete_pokedex" element={<CompletePokedex />} />
      </Routes>
      <StickyFooter />
    </Router>
  );
}

export default App;
