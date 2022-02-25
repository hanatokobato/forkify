import React from 'react';
import Header from './components/Header';
import Recipe from './components/Recipe';
import SearchResults from './components/SearchResults';
import { Routes, Route } from 'react-router-dom';
import { SearchContextProvider } from './context/SearchContext';

function App() {
  return (
    <>
      <SearchContextProvider>
        <Header />
        <SearchResults />
      </SearchContextProvider>
      <Routes>
        <Route path="/" element={<Recipe />} />
        <Route path="/recipes/:id" element={<Recipe />} />
      </Routes>
    </>
  );
}

export default App;
