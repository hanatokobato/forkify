import { AppBar, Box, Button, Chip, MenuItem, Typography } from '@mui/material';
import React, { useCallback, useRef } from 'react';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import TextField from '../../FormInput/TextField';
import arrayMutators from 'final-form-arrays';
import { Add, DeleteOutline } from '@mui/icons-material';
import MultiSelect from '../../FormInput/MultiSelect';
import {
  useGetCountriesNonShippingZoneQuery,
  useGetShippingZonesQuery,
  useSettingShippingZoneMutation,
} from '../../../../generated/graphql';

const NewShipping = ({ cancelHandler }: any) => {
  const {
    data: countryData,
    refetch: refetchCountries,
  } = useGetCountriesNonShippingZoneQuery();
  const [addShippingZone] = useSettingShippingZoneMutation();
  const { refetch: refetchZones } = useGetShippingZonesQuery();
  const cancelBtn = useRef<HTMLButtonElement>(null);

  const submitFormHandler = useCallback(async (data) => {
    try {
      const shippingRates = data.rates.map((r: any) => ({
        ...r,
        amount: +r.amount,
      }));
      const { data: response } = await addShippingZone({
        variables: {
          name: data.name,
          shippingRates: shippingRates,
          countryIds: data.countries,
        },
      });
      if (response?.settingShippingZone?.errors.length) {
        throw new Error(response.settingShippingZone.errors[0]);
      } else {
        refetchZones();
        cancelBtn!.current!.click();
        refetchCountries();
      }
    } catch (e) {
      throw e;
    }
  }, [addShippingZone, refetchCountries, refetchZones]);

  return (
    <Box
      sx={{ width: '100vw', maxWidth: 1040, overflowY: 'auto' }}
      role="presentation"
    >
      <AppBar
        sx={{
          padding: '0 3rem',
          minHeight: '7rem',
          justifyContent: 'center',
          backgroundColor: '#f9f5f3',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          width: '100vw',
          maxWidth: 1040,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">Add zone</Typography>
        </Box>
      </AppBar>
      <Form
        onSubmit={submitFormHandler}
        mutators={{ ...arrayMutators }}
        initialValues={{ rates: [{}] }}
        render={({
          handleSubmit,
          form: {
            mutators: { push },
          },
        }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ padding: '2rem', margin: '10rem 0' }}>
              <Box>
                <Box>
                  <Box>
                    <Typography variant="h6" sx={{ marginBottom: '1.6rem' }}>
                      Zone name
                    </Typography>
                    <TextField name="name" label="Name" required />
                  </Box>
                  <Box sx={{ marginTop: '2rem' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '1.6rem',
                      }}
                    >
                      <Typography variant="h6">Rates</Typography>
                      <Button
                        variant="contained"
                        sx={{ lineHeight: 1 }}
                        startIcon={<Add />}
                        onClick={() => push('rates', undefined)}
                      >
                        Add
                      </Button>
                    </Box>

                    <FieldArray name="rates">
                      {({ fields }) =>
                        fields.map((name, index) => (
                          <Box
                            sx={{
                              display: 'flex',
                              marginBottom: '1.6rem',
                              alignItems: 'flex-start',
                            }}
                            key={name}
                          >
                            <Box sx={{ flex: 1, marginRight: '1rem' }}>
                              <TextField
                                name={`${name}.name`}
                                label="Rate"
                                required
                              />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <TextField
                                required
                                name={`${name}.amount`}
                                label="Amount"
                                type="number"
                                inputProps={{
                                  maxLength: 13,
                                  step: '0.01',
                                }}
                              />
                            </Box>
                            <DeleteOutline
                              sx={{ cursor: 'pointer', alignSelf: 'center' }}
                              onClick={() => fields.remove(index)}
                            />
                          </Box>
                        ))
                      }
                    </FieldArray>
                  </Box>
                  <Box sx={{ marginTop: '2rem' }}>
                    <Typography variant="h6" sx={{ marginBottom: '1.6rem' }}>
                      Countries & regions
                    </Typography>
                    <Field
                      name="countries"
                      styling="field"
                      component={MultiSelect}
                      renderValue={(selected: any) => (
                        <div className="multi-select-chips">
                          {selected.map((value: number) => (
                            <Chip
                              key={value}
                              label={
                                (countryData?.countries || []).find(
                                  (c) => c.id === value
                                )?.name
                              }
                              className="multi-select-chip"
                            />
                          ))}
                        </div>
                      )}
                      required
                    >
                      {(countryData?.countries || []).map((country, index) => (
                        <MenuItem key={country.id} value={country.id}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </Box>
                </Box>
              </Box>
            </Box>
            <AppBar
              sx={{
                top: 'auto',
                bottom: 0,
                padding: '0 3rem',
                minHeight: '7rem',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'white',
                boxShadow: 'none',
                borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                width: '100vw',
                maxWidth: 1040,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="text" onClick={cancelHandler} ref={cancelBtn}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ marginLeft: '1rem' }}
                >
                  Save changes
                </Button>
              </Box>
            </AppBar>
          </form>
        )}
      ></Form>
    </Box>
  );
};

export default NewShipping;
