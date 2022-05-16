import React, { useState } from 'react';
import Header from './components/Header';
import { Routes, Route, useNavigate, To } from 'react-router-dom';
import { SearchContextProvider } from './context/SearchContext';
import { BookmarkContextProvider } from './context/BookmarkContext';
import NewRecipe from './components/NewRecipe';
import ProtectedRoute from './components/ProtectedRoute';
import Products from './components/Products';
import Recipes from './components/Recipes';

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
          <Routes>
            <Route path="/" element={<Recipes />} />
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
            <Route path="/recipes/:id" element={<Recipes />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </SearchContextProvider>
      </BookmarkContextProvider>
    </>
  );
}

export default App;
