import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import classes from './index.module.scss';
import {
  useGetUsersQuery,
} from '../../../generated/graphql';

const Users = () => {
  const { data } = useGetUsersQuery();

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'NAME',
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className={classes.productListItem}>
            <img className={classes.productListImg} src="" alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: 'nickname', headerName: 'NICKNAME', width: 200 },
    { field: 'email', headerName: 'EMAIL', width: 200 },
    { field: 'role', headerName: 'ROLE', width: 200 },
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
          Users
        </Typography>
      </Box>
      <Box sx={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
        <DataGrid
          rows={data?.users || []}
          disableSelectionOnClick
          columns={columns}
          checkboxSelection
        />
      </Box>
    </>
  );
};

export default Users;
