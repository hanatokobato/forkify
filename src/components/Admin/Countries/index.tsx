import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import {
  useGetCountriesQuery,
  useUpdateActiveMutation,
} from '../../../generated/graphql';
import classes from './index.module.scss';

const DEFAULT_PER_PAGE = 10;
const PER_PAGE_OPTIONS = [10];

const Countries = () => {
  const [page, setPage] = React.useState(0);
  const { data } = useGetCountriesQuery({
    variables: { offset: page * DEFAULT_PER_PAGE },
  });
  const [updateActive] = useUpdateActiveMutation();

  const activateContrry = (id: number) => {
    updateActive({ variables: { id: id, active: true } });
  };

  const inActivateContry = (id: number) => {
    updateActive({ variables: { id: id, active: true } });
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    { field: 'abbreviation', headerName: 'Abbreviation', flex: 1 },
    {
      field: 'active',
      headerName: 'Active',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <>
            {!params.row.active && (
              <button
                className={classes.activate}
                onClick={() => activateContrry(params.row.id)}
              >
                Activate
              </button>
            )}
            {params.row.active && (
              <button
                className={classes.inActivate}
                onClick={() => inActivateContry(params.row.id)}
              >
                InActivate
              </button>
            )}
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
          Countries
        </Typography>
      </Box>
      <Box sx={{ height: '90%', width: '100%', backgroundColor: '#fff' }}>
        <DataGrid
          rows={data?.countries || []}
          disableSelectionOnClick
          columns={columns}
          paginationMode="server"
          rowCount={data?.countries_aggregate.aggregate?.count || 0}
          pageSize={10}
          onPageChange={(newPage) => setPage(newPage)}
          rowsPerPageOptions={PER_PAGE_OPTIONS}
        />
      </Box>
    </>
  );
};

export default Countries;
