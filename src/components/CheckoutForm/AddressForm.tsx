import React, { useEffect, useState } from 'react';
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
import { commerce } from '../../utils/commerce';
import {
  useGetCheckoutCountriesLazyQuery,
  useGetCheckoutStatesLazyQuery,
} from '../../generated/graphql';

const AddressForm = ({ test }: any) => {
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const [
    fetchContries,
    { data: countryData },
  ] = useGetCheckoutCountriesLazyQuery();
  const [fetchStates, { data: stateData }] = useGetCheckoutStatesLazyQuery();

  const submitFormHandler = (values: any) => {
    const params = {
      ...values,
      shippingCountry,
      shippingSubdivision,
      shippingOption,
    };
    test(params);
  };

  const fetchShippingCountries = () => {
    fetchContries();
  };

  const fetchSubdivisions = (countryId: any) => {
    fetchStates({ variables: { countryId: countryId } });
  };

  const fetchShippingOptions = async (
    checkoutTokenId: any,
    country: any,
    stateProvince: any = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries();
  }, []);

  useEffect(() => {
    setShippingCountry(countryData?.countries[0]?.id);
  }, [countryData]);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    setShippingSubdivision(stateData?.states[0]?.id);
  }, [stateData]);

  useEffect(() => {
    // if (shippingSubdivision)
    //   fetchShippingOptions(
    //     checkoutToken.id,
    //     shippingCountry,
    //     shippingSubdivision
    //   );
  }, [shippingSubdivision]);

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
                      value={shippingCountry}
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
                        value={shippingSubdivision}
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
              {null && (
                <Field name="shippingOption">
                  {({ input, ...rest }) => (
                    <Grid item xs={12} sm={6}>
                      <InputLabel>Shipping Options</InputLabel>
                      <Select
                        {...input}
                        {...rest}
                        fullWidth
                        required
                        value={shippingOption}
                        onChange={(e) => setShippingOption(e.target.value)}
                      >
                        {shippingOptions
                          .map((sO: any) => ({
                            id: sO.id,
                            label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
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
