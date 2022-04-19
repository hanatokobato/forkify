import React, { useState } from 'react';
import Header from './components/Header';
import Recipe from './components/Recipe';
import SearchResults from './components/SearchResults';
import { Routes, Route, useNavigate, NavigateOptions, To } from 'react-router-dom';
import { SearchContextProvider } from './context/SearchContext';
import { BookmarkContextProvider } from './context/BookmarkContext';
import NewRecipe from './components/NewRecipe';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [openNewRecipe, setOpenNewRecipe] = useState<boolean>(false);
  const navigate = useNavigate();

  const openNewRecipeHandler = () => {
    navigate('/recipes/new');
    setOpenNewRecipe(true);
  };

  const closeNewRecipeHandler = (path: To) => {
    setOpenNewRecipe(false);
    navigate(path);
  };

  return (
    <>
      <BookmarkContextProvider>
        <SearchContextProvider>
          <Header openNewRecipeHandler={openNewRecipeHandler} />
          <SearchResults />
        </SearchContextProvider>
        <Routes>
          <Route path="/" element={<Recipe />} />
          <Route
            path="/recipes/new"
            element={
              <ProtectedRoute>
                <NewRecipe
                  isOpen={openNewRecipe}
                  closeHandler={closeNewRecipeHandler}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/recipes/:id" element={<Recipe />} />
        </Routes>
      </BookmarkContextProvider>
    </>
  );
}

export default App;
