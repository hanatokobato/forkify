import React, { useContext } from 'react';
import Header from './components/Header';
import { Routes, Route, useNavigate, To } from 'react-router-dom';
import { SearchContextProvider } from './context/SearchContext';
import { BookmarkContextProvider } from './context/BookmarkContext';
import NewRecipe from './components/NewRecipe';
import ProtectedRoute from './components/ProtectedRoute';
import Products from './components/Products';
import Recipes from './components/Recipes';
import Cart from './components/Cart';
import Checkout from './components/CheckoutForm/Checkout';
import { createTheme, ThemeProvider } from '@mui/material';
import Admin from './components/Admin';
import { ADMIN, AuthContext, USER } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f38e82',
    },
    secondary: {
      main: '#fbdb89',
    },
    background: {
      default: '#f9f5f3',
    },
  },
  typography: {
    fontFamily: '"Nunito Sans",sans-serif',
    fontSize: 22.4,
  },
});

function App() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const openNewRecipeHandler = () => {
    navigate('/recipes/new');
  };

  const closeNewRecipeHandler = (path: To) => {
    navigate(path);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {currentUser?.type === ADMIN && (
          <Routes>
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
        {(!currentUser || currentUser.type === USER) && (
          <BookmarkContextProvider>
            <SearchContextProvider>
              <div className="container">
                <Header openNewRecipeHandler={openNewRecipeHandler} />
                <Routes>
                  <Route path="/" element={<Recipes />} />
                  <Route
                    path="/recipes/new"
                    element={
                      <ProtectedRoute>
                        <NewRecipe closeHandler={closeNewRecipeHandler} />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/recipes/:id" element={<Recipes />} />
                  <Route
                    path="/products"
                    element={
                      <ProtectedRoute>
                        <Products />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </SearchContextProvider>
          </BookmarkContextProvider>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
