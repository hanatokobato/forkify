import React from 'react';
import Header from './components/Header';
import Recipe from './components/Recipe';
import SearchResults from './components/SearchResults';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <SearchResults />
      <Routes>
        <Route path="/" element={<Recipe />} />
        <Route path="/recipes/:id" element={<Recipe />} />
      </Routes>
    </>
  );
}

export default App;
