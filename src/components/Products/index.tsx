import { Grid, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { commerce } from '../../utils/commerce';
import Product from '../Product';

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

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Root className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Root>
  );
};

export default Products;
