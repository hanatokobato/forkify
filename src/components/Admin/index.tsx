import React, { useEffect } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import UserList from './Users';
import ProductList from './Products';
import NewProduct from './Products/NewProduct';
import { Box } from '@mui/material';
import EditProduct from './Products/EditProduct';
import Countries from './Countries';
import Shipping from './Shipping';

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/admin');
    }
  }, []);

  return (
    <>
      <Topbar />

      <div className="admin-container">
        <Sidebar />
        <Box
          sx={{ flex: 4, padding: '2rem 2.5rem', backgroundColor: '#f9f5f3' }}
        >
          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<NewProduct />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/settings/shipping" element={<Shipping />} />
          </Routes>
        </Box>
      </div>
    </>
  );
};

export default Admin;
