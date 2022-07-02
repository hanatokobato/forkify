import { DeleteOutline, Add } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import {
  useGetProductsQuery,
  Product as ProductType,
  useDeleteProductMutation,
} from '../../../generated/graphql';
import { getDownloadUrl } from '../../../utils/uploadImage';

interface FormattedProduct extends ProductType {
  imgs: string[];
}

const Products = () => {
  const { data, loading, error, refetch } = useGetProductsQuery();
  const [deleteProductMutation] = useDeleteProductMutation();
  const [products, setProducts] = useState<FormattedProduct[]>([]);
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    deleteProductMutation({ variables: { productId: id } });
    refetch();
  };

  const formatProducts = async (products: ProductType[]) => {
    const formattedProducts = await Promise.all(
      products.map(async (product: ProductType) => {
        const imgs = await Promise.all(
          product.images!.map((i: any) => {
            const url = getDownloadUrl(i.photoLink!);
            return url;
          })
        );
        return { ...product, imgs: imgs };
      })
    );
    setProducts(formattedProducts);
  };

  useEffect(() => {
    if (data?.products) {
      formatProducts(data.products);
    }
  }, [data]);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'product',
      headerName: 'PRODUCT',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <div className={classes.productListItem}>
            <img
              className={classes.productListImg}
              src={params.row.imgs[0]}
              alt=""
            />
            {params.row.name}
          </div>
        );
      },
    },
    { field: 'quantity', headerName: 'REMAINING', flex: 1 },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 1,
      valueGetter: () => 'ACTIVE',
    },
    {
      field: 'price',
      headerName: 'PRICE',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'ACTIONS',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <>
            <Link to={`/admin/products/${params.row.id}/edit`}>
              <button className={classes.productListEdit}>Edit</button>
            </Link>
            <DeleteOutline
              className={classes.productListDelete}
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
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
          Products
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            sx={{ lineHeight: 1 }}
            startIcon={<Add />}
            onClick={() => navigate('new')}
          >
            Add
          </Button>
        </Box>
      </Box>
      <Box sx={{ height: '90%', width: '100%', backgroundColor: '#fff' }}>
        <DataGrid rows={products} disableSelectionOnClick columns={columns} />
      </Box>
    </>
  );
};

export default Products;
