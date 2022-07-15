import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Switch,
} from '@mui/material';
import { Form, Field } from 'react-final-form';
import FormInput from './CustomTextField';
import { Link } from 'react-router-dom';
import {
  useGetAddressesQuery,
  useGetCartQuery,
  useGetCheckoutCountriesLazyQuery,
  useGetCheckoutStatesLazyQuery,
  useGetShippingOptionsLazyQuery,
} from '../../generated/graphql';
import { AuthContext } from '../../context/AuthContext';

export interface FormData {
  addressId: number;
  address1: string;
  city: string;
  email: string;
  firstName: string;
  lastName: string;
  shippingCountry: number;
  shippingOption: number;
  shippingSubdivision: number;
  zip: string;
}

const AddressForm = ({ test }: any) => {
  const { currentUser } = useContext(AuthContext);
  const { data: addressData } = useGetAddressesQuery();
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
  const [selectedAddress, setSelectedAddress] = useState<number>();

  const submitFormHandler = (values: any) => {
    let params;
    if (selectedAddress) {
      params = { addressId: selectedAddress }
    } else {
      params = {
        ...values,
        shippingCountry,
        shippingSubdivision,
        shippingOption,
      };

    }
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

  const handleToggleAddress = (addressId: number) => () => {
    setSelectedAddress((oldId) => (oldId ? undefined : addressId));
  };

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
        {addressData?.addresses?.length !== 0
          ? 'Pick a Shipping Address'
          : null}
      </Typography>

      <List>
        {(addressData?.addresses || []).map((address) => (
          <>
            <ListItem key={address.id}>
              <ListItemText
                primary={`${address.first_name} ${address.last_name}`}
                secondary={
                  <>
                    <Typography component="div">{address.address1}</Typography>
                    <Typography component="div">{`${address.city}, ${address.state?.abbreviation} ${address.zip_code}`}</Typography>
                  </>
                }
              />
              <Switch
                edge="end"
                onChange={handleToggleAddress(address.id)}
                checked={address.id === selectedAddress}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-wifi',
                }}
              />
            </ListItem>
            <Divider key={`divider-${address.id}`} sx={{ marginBottom: 5 }} />
          </>
        ))}
      </List>
      {selectedAddress ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">
              Back to Cart
            </Button>
            <Button variant="contained" color="primary" onClick={submitFormHandler}>
              Next
            </Button>
          </div>
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            New Address
          </Typography>
          <Form
            onSubmit={submitFormHandler}
            render={({ handleSubmit }) => (
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
                  {stateData?.states.length !== 0 ? (
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
                            onChange={(e) =>
                              setShippingSubdivision(e.target.value)
                            }
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
                  {shipOptionData?.shippingOptions?.length !== 0 ? (
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
                            {shipOptionData?.shippingOptions
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
                  ) : null}
                </Grid>
                <br />
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
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
      )}
    </>
  );
};

export default AddressForm;
