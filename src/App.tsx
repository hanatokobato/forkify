import React, { useState } from 'react';
import Header from './components/Header';
import Recipe from './components/Recipe';
import SearchResults from './components/SearchResults';
import { Routes, Route } from 'react-router-dom';
import { SearchContextProvider } from './context/SearchContext';
import { BookmarkContextProvider } from './context/BookmarkContext';
import NewRecipe from './components/NewRecipe';

function App() {
  const [openNewRecipe, setOpenNewRecipe] = useState<boolean>(false);

  const openNewRecipeHandler = () => {
    setOpenNewRecipe(true);
  };

  const closeNewRecipeHandler = () => {
    setOpenNewRecipe(false);
  };

  return (
    <>
      <BookmarkContextProvider>
        <SearchContextProvider>
          <Header openNewRecipeHandler={openNewRecipeHandler} />
          <SearchResults />
        </SearchContextProvider>
        <NewRecipe
          isOpen={openNewRecipe}
          closeHandler={closeNewRecipeHandler}
        />
        <Routes>
          <Route path="/" element={<Recipe />} />
          <Route path="/recipes/:id" element={<Recipe />} />
        </Routes>
      </BookmarkContextProvider>
    </>
  );
}

export default App;
