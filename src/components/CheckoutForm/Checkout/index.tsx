import React, { useContext, useEffect, useState } from 'react';
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {
  useCreateAddressMutation,
  useCreateOrderMutation,
  useGetCartQuery,
} from '../../../generated/graphql';
import { AuthContext } from '../../../context/AuthContext';
import { FormData as AddressFormData } from '../AddressForm';

const PREFIX = 'Checkout';

const classes = {
  appBar: `${PREFIX}-appBar`,
  layout: `${PREFIX}-layout`,
  paper: `${PREFIX}-paper`,
  stepper: `${PREFIX}-stepper`,
  buttons: `${PREFIX}-buttons`,
  button: `${PREFIX}-button`,
  divider: `${PREFIX}-divider`,
  spinner: `${PREFIX}-spinner`,
};

const Root = styled('main')(({ theme }) => ({
  [`&.${classes.layout}`]: {
    marginTop: '5%',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + +theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  [`& .${classes.appBar}`]: {
    position: 'relative',
  },
  [`& .${classes.paper}`]: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: 60,
    },
    [theme.breakpoints.up(600 + +theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  [`& .${classes.stepper}`]: {
    padding: theme.spacing(3, 0, 5),
  },
  [`& .${classes.buttons}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  [`& .${classes.button}`]: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  [`& .${classes.divider}`]: {
    margin: '20px 0',
  },
  [`& .${classes.spinner}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, onCaptureCheckout, order, error }: any) => {
  const { currentUser } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const { data: cartData } = useGetCartQuery({
    variables: { userId: currentUser!.id },
  });
  const [createOrder] = useCreateOrderMutation();
  const [createAddress] = useCreateAddressMutation();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const test = (data: AddressFormData) => {
    setShippingData(data);
    const {
      address1,
      city,
      firstName,
      lastName,
      shippingCountry: countryId,
      shippingSubdivision: stateId,
      zip: zipCode,
    } = data;
    createAddress({
      variables: {
        address1,
        city,
        firstName,
        lastName,
        countryId,
        stateId,
        zipCode,
      },
    });

    nextStep();
  };

  useEffect(() => {
    if (cartData?.cart?.id) {
      createOrder({ variables: { cartId: cartData.cart.id } });
    }
  }, [cartData, createOrder]);

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{' '}
            {order.customer.lastname}!
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    );
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm test={test} />
    ) : (
      <PaymentForm
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
        onCaptureCheckout={onCaptureCheckout}
      />
    );

  return (
    <div>
      <CssBaseline />
      <Root className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </Root>
    </div>
  );
};

export default Checkout;
