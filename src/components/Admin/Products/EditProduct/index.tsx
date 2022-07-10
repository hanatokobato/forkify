import { ArrowBack } from '@mui/icons-material';
import { Box, Container, Link, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import FormAction from '../NewProduct/FormAction';
import FormDetail from '../NewProduct/FormDetail';
import Navigation from '../NewProduct/Navigation';
import { FormData } from '../NewProduct';
import {
  useGetProductLazyQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} from '../../../../generated/graphql';
import { uploadImage } from '../../../../utils/uploadImage';

const initialFormData: FormData = {
  images: [],
};

const EditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [getProduct, { data }] = useGetProductLazyQuery();
  const [
    updateProductMutation,
    { data: dataUpdated },
  ] = useUpdateProductMutation();
  const { refetch } = useGetProductsQuery();

  const submitFormHandler = useCallback(
    async (values: any) => {
      const imageUrls = await Promise.all(
        formData.images.map((image: any) => uploadImage(image))
      );
      const { __typename, ...productInput }: any = {
        ...values,
        images: imageUrls.map((i) => ({ photoLink: i })),
        price: +values.price,
        quantity: +values.quantity,
      };
      await updateProductMutation({ variables: { productInput } });
      await refetch();
      navigate('/admin/products');
    },
    [formData, navigate, refetch, updateProductMutation]
  );

  const fileChangeHandler = (files: any) => {
    setFormData((data) => ({ ...data, images: files }));
  };

  useEffect(() => {
    const productId = params.id;
    if (productId) getProduct({ variables: { productId: productId } });
  }, [getProduct, params.id]);

  return (
    <div>
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
        initialValues={{ ...data?.product }}
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
                Edit product
              </Typography>
            </Box>
            <Container sx={{ display: 'flex' }}>
              <Navigation />
              <FormDetail
                fileChangeHandler={fileChangeHandler}
                product={data?.product || undefined}
              />
              <FormAction />
            </Container>
          </form>
        )}
      ></Form>
    </div>
  );
};

export default EditProduct;
