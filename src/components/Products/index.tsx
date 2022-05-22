import { Grid, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commerce } from '../../utils/commerce';
import Product, { Product as ProductType } from '../Product';
import { RootState } from '../../store';
import { setProducts } from '../../store/products/slice';

const PREFIX = 'Products';

const classes = {
  content: `${PREFIX}-content`,
  toolbar: `${PREFIX}-toolbar`,
};

const Root = styled('main')(({ theme }) => ({
  [`& .${classes.toolbar}`]: theme.mixins.toolbar,
  [`&.${classes.content}`]: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Products = ({ onAddToCart }: { onAddToCart: any }) => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    dispatch(setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Root className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={6} lg={4}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Root>
  );
};

export default Products;
