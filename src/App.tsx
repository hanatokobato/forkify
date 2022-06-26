import React, { useContext, useState } from 'react';
import Header from './components/Header';
import { Routes, Route, useNavigate, To } from 'react-router-dom';
import { SearchContextProvider } from './context/SearchContext';
import { BookmarkContextProvider } from './context/BookmarkContext';
import NewRecipe from './components/NewRecipe';
import ProtectedRoute from './components/ProtectedRoute';
import Products from './components/Products';
import Recipes from './components/Recipes';
import Cart, { Cart as CartType } from './components/Cart';
import { commerce } from './utils/commerce';
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

  const [cart, setCart] = useState<CartType>({
    total_items: 0,
    line_items: [],
    subtotal: {
      formatted_with_symbol: '',
    },
  });
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const openNewRecipeHandler = () => {
    navigate('/recipes/new');
  };

  const closeNewRecipeHandler = (path: To) => {
    navigate(path);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId: any, newOrder: any) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error: any) {
      setErrorMessage(error.data.error.message);
    }
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
                        <Checkout
                          cart={cart}
                          order={order}
                          onCaptureCheckout={handleCaptureCheckout}
                          error={errorMessage}
                        />
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
