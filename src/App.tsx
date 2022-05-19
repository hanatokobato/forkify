import React, { useEffect, useState } from 'react';
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#f38e82',
    },
    secondary: {
      main: '#fbdb89',
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontSize: 22.4,
  },
});

function App() {
  const [openNewRecipe, setOpenNewRecipe] = useState<boolean>(false);
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartType>({
    line_items: [],
    subtotal: {
      formatted_with_symbol: '',
    },
  });
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const openNewRecipeHandler = () => {
    navigate('/recipes/new');
    setOpenNewRecipe(true);
  };

  const closeNewRecipeHandler = (path: To) => {
    setOpenNewRecipe(false);
    navigate(path);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId: number, quantity: number) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId: number, quantity: number) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId: number) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
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

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
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
              <Route
                path="/products"
                element={<Products onAddToCart={handleAddToCart} />}
              />
              <Route
                path="/cart"
                element={
                  <Cart
                    cart={cart}
                    onUpdateCartQty={handleUpdateCartQty}
                    onRemoveFromCart={handleRemoveFromCart}
                    onEmptyCart={handleEmptyCart}
                  />
                }
              />
              <Route
                path="/checkout"
                element={
                  <Checkout
                    cart={cart}
                    order={order}
                    onCaptureCheckout={handleCaptureCheckout}
                    error={errorMessage}
                  />
                }
              />
            </Routes>
          </SearchContextProvider>
        </BookmarkContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
