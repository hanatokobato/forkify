import { Grid, styled } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product, { Product as ProductType } from '../Product';
import { RootState } from '../../store';
import { setProducts } from '../../store/products/slice';
import { useGetProductsQuery } from '../../generated/graphql';
import { getDownloadUrl } from '../../utils/uploadImage';

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
  const { data: productData } = useGetProductsQuery();
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  const formatProducts: () => Promise<ProductType[]> = useCallback(async () => {
    if (productData) {
      return await Promise.all(
        productData.products!.map(async (p) => {
          const imgs = await Promise.all(
            p.images!.map((i: any) => {
              const url = getDownloadUrl(i.photoLink!);
              return url;
            })
          );
          const formattedProduct = {
            id: +p.id,
            name: p.name!,
            description: p.description!,
            price: {
              formatted: (Math.round(p.price! * 100) / 100).toFixed(2),
            },
            image: {
              url: imgs[0],
            },
          };
          return formattedProduct;
        })
      );
    } else {
      return [];
    }
  }, [productData]);

  const storeProducts = useCallback(async () => {
    const products = await formatProducts();
    dispatch(setProducts(products));
  }, [formatProducts, dispatch]);

  useEffect(() => {
    storeProducts();
  }, [storeProducts]);

  return (
    <Root className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={6} lg={4}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Root>
  );
};

export default Products;
