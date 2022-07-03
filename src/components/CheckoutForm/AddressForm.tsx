import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { Form, Field } from 'react-final-form';
import FormInput from './CustomTextField';
import { Link } from 'react-router-dom';
import {
  useGetCartQuery,
  useGetCheckoutCountriesLazyQuery,
  useGetCheckoutStatesLazyQuery,
  useGetShippingOptionsLazyQuery,
} from '../../generated/graphql';
import { AuthContext } from '../../context/AuthContext';

const AddressForm = ({ test }: any) => {
  const { currentUser } = useContext(AuthContext);
  const { data: cartData } = useGetCartQuery({
    variables: { userId: currentUser!.id },
  });
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOption, setShippingOption] = useState('');
  const [
    fetchContries,
    { data: countryData },
  ] = useGetCheckoutCountriesLazyQuery();
  const [fetchStates, { data: stateData }] = useGetCheckoutStatesLazyQuery();
  const [
    fetchShippingOptions,
    { data: shipOptionData },
  ] = useGetShippingOptionsLazyQuery();

  const submitFormHandler = (values: any) => {
    const params = {
      ...values,
      shippingCountry,
      shippingSubdivision,
      shippingOption,
    };
    test(params);
  };

  const fetchShippingCountries = useCallback(async () => {
    const { data } = await fetchContries();
    setShippingCountry(data?.countries[0]?.id);
  }, [fetchContries]);

  const fetchSubdivisions = useCallback(
    async (countryId: any) => {
      const { data } = await fetchStates({
        variables: { countryId: countryId },
      });
      setShippingSubdivision(data?.states[0]?.id);
    },
    [fetchStates]
  );

  const fetchOptions = useCallback(
    async (cartId: number, countryId: number, stateId: number) => {
      const { data } = await fetchShippingOptions({
        variables: { cartId, countryId, stateId },
      });

      setShippingOption(data?.shippingOptions[0]?.shippingRateId || '');
    },
    [fetchShippingOptions]
  );

  useEffect(() => {
    fetchShippingCountries();
  }, [fetchShippingCountries]);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry, fetchSubdivisions]);

  useEffect(() => {
    if (shippingCountry && cartData) {
      fetchOptions(cartData.cart!.id, +shippingCountry, +shippingSubdivision);
    }
  }, [shippingSubdivision, shippingCountry, fetchOptions, cartData]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Form
        onSubmit={submitFormHandler}
        render={({
          handleSubmit,
          form: {
            mutators: { push },
          },
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <FormInput required name="firstName" label="First name" />
              <FormInput required name="lastName" label="Last name" />
              <FormInput required name="address1" label="Address line 1" />
              <FormInput required name="email" label="Email" />
              <FormInput required name="city" label="City" />
              <FormInput required name="zip" label="Zip / Postal code" />
              <Field name="shippingCountry">
                {({ input, ...rest }) => (
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Country</InputLabel>
                    <Select
                      {...input}
                      {...rest}
                      fullWidth
                      required
                      value={shippingCountry?.toString() || ''}
                      onChange={(e) => setShippingCountry(e.target.value)}
                    >
                      {countryData?.countries.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                )}
              </Field>
              {stateData?.states.length ? (
                <Field name="shippingSubdivision">
                  {({ input, ...rest }) => (
                    <Grid item xs={12} sm={6}>
                      <InputLabel>Shipping Subdivision</InputLabel>
                      <Select
                        {...input}
                        {...rest}
                        fullWidth
                        required
                        value={shippingSubdivision?.toString() || ''}
                        onChange={(e) => setShippingSubdivision(e.target.value)}
                      >
                        {stateData?.states.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  )}
                </Field>
              ) : null}
              {shipOptionData?.shippingOptions && (
                <Field name="shippingOption">
                  {({ input, ...rest }) => (
                    <Grid item xs={12} sm={6}>
                      <InputLabel>Shipping Options</InputLabel>
                      <Select
                        {...input}
                        {...rest}
                        fullWidth
                        required
                        value={shippingOption.toString()}
                        onChange={(e) => setShippingOption(e.target.value)}
                      >
                        {shipOptionData.shippingOptions
                          .map((sO: any) => ({
                            id: sO.shippingRateId,
                            label: `${sO.description} - (${sO.price})`,
                          }))
                          .map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.label}
                            </MenuItem>
                          ))}
                      </Select>
                    </Grid>
                  )}
                </Field>
              )}
            </Grid>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button component={Link} variant="outlined" to="/cart">
                Back to Cart
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Next
              </Button>
            </div>
          </form>
        )}
      ></Form>
    </>
  );
};

export default AddressForm;
