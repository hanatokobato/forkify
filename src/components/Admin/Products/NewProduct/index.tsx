import { ArrowBack } from '@mui/icons-material';
import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import classes from './index.module.scss';
import { Form } from 'react-final-form';
import Navigation from './Navigation';
import FormDetail from './FormDetail';
import FormAction from './FormAction';
import { uploadImage } from '../../../../utils/uploadImage';
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from '../../../../generated/graphql';

export interface FormData {
  images: [];
}

const initialFormData: FormData = {
  images: [],
};

const NewProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { refetch } = useGetProductsQuery();
  const [createProductMutation] = useCreateProductMutation();

  const fileChangeHandler = (files: any) => {
    setFormData((data) => ({ ...data, images: files }));
  };

  const submitFormHandler = useCallback(
    async (values: any) => {
      const imageUrls = await Promise.all(
        formData.images.map((image: any) => uploadImage(image))
      );
      const productInput = {
        ...values,
        images: imageUrls.map((i) => ({ photoLink: i })),
        price: +values.price,
        quantity: +values.quantity,
      };
      await createProductMutation({ variables: { productInput } });
      await refetch();
      navigate('/admin/products');
    },
    [formData, createProductMutation, navigate, refetch]
  );

  return (
    <div className={classes.newProduct}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Link
            component={RouterLink}
            to="/admin/products"
            underline="none"
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '4.8rem',
            }}
          >
            <ArrowBack sx={{ fontSize: 'small' }} />
            Products
          </Link>
        </Box>
      </Box>
      <Form
        onSubmit={submitFormHandler}
        render={({
          handleSubmit,
          form: {
            mutators: { push },
          },
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              component="header"
              sx={{
                marginBottom: '3.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h2" sx={{ fontSize: '2.3rem' }}>
                Add product
              </Typography>
            </Box>
            <Container sx={{ display: 'flex' }}>
              <Navigation />
              <FormDetail fileChangeHandler={fileChangeHandler} />
              <FormAction />
            </Container>
          </form>
        )}
      ></Form>
    </div>
  );
};

export default NewProduct;
