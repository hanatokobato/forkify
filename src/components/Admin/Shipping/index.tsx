import { QueryResult } from '@apollo/client';
import { Add, DeleteOutline } from '@mui/icons-material';
import { Box, Button, Drawer, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useCallback, useState } from 'react';
import {
  GetShippingZonesDocument,
  GetShippingZonesQueryResult,
  useDeleteShippingZoneMutation,
  useGetCountriesNonShippingZoneQuery,
  useGetShippingZonesQuery,
} from '../../../generated/graphql';
import classes from './index.module.scss';
import NewShipping from './NewShipping';

type ExtractData<Q> = Q extends QueryResult<infer T, any> ? T : never;

const Shipping = () => {
  const [isOpenNew, setIsOpenNew] = useState<boolean>(false);
  const { data: shippingZonesData } = useGetShippingZonesQuery();
  const [deleteZone] = useDeleteShippingZoneMutation();
  const { refetch: refetchContries } = useGetCountriesNonShippingZoneQuery();

  const handleDelete = useCallback(async (id: string) => {
    try {
      await deleteZone({
        variables: { id: id },
        update: (cache, { data }) => {
          const cachedData = cache.readQuery<
            ExtractData<GetShippingZonesQueryResult>
          >({
            query: GetShippingZonesDocument,
          });
          cache.writeQuery({
            query: GetShippingZonesDocument,
            data: {
              shipping_zones: cachedData?.shipping_zones?.filter(
                (sz: any) => sz.id != data?.deleteShippingZone?.id
              ),
            },
          });
        },
      });
      refetchContries();
    } catch (e) {
      throw e;
    }
  }, []);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpenNew(open);
  };

  const columns = [
    { field: 'name', headerName: 'ZONE', flex: 1 },
    {
      field: 'countries_aggregate',
      headerName: 'NO. OF COUNTRIES',
      flex: 1,
      valueGetter: (params: any) => {
        return params.row.countries_aggregate.aggregate.count;
      },
    },
    {
      field: 'countries',
      headerName: 'NO. OF REGIONS',
      flex: 1,
      valueGetter: (params: any) => {
        return params.row.countries.reduce((sum: number, ct: any) => {
          return sum + ct.states_aggregate.aggregate.count;
        }, 0);
      },
    },
    {
      field: 'action',
      headerName: 'ACTIONS',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <>
            <button className={classes.productListEdit}>Edit</button>
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
          Shipping zones
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            sx={{ lineHeight: 1 }}
            startIcon={<Add />}
            onClick={toggleDrawer(true)}
          >
            Add
          </Button>
          <Drawer anchor="right" open={isOpenNew} onClose={toggleDrawer(false)}>
            <NewShipping cancelHandler={toggleDrawer(false)} />
          </Drawer>
        </Box>
      </Box>
      <Box sx={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
        <DataGrid
          rows={shippingZonesData?.shipping_zones || []}
          disableSelectionOnClick
          columns={columns}
        />
      </Box>
    </>
  );
};

export default Shipping;
