import React from 'react';
import { Container, Typography, Button, Grid, styled } from '@mui/material';
import { Link } from 'react-router-dom';

import CartItem, { Item as LineItem } from './CartItem';

export interface Cart {
  line_items: LineItem[];
  subtotal: {
    formatted_with_symbol: string;
  };
}

interface Props {
  cart: Cart;
  onUpdateCartQty: any;
  onRemoveFromCart: any;
  onEmptyCart: any;
}

const PREFIX = 'Cart';

const classes = {
  title: `${PREFIX}-title`,
  emptyButton: `${PREFIX}-emptyButton`,
  checkoutButton: `${PREFIX}-checkoutButton`,
  link: `${PREFIX}-link`,
  cardDetails: `${PREFIX}-cardDetails`,
};

const Root = styled(Container)(({ theme }) => ({
  [`& .${classes.title}`]: {
    marginTop: '2rem',
    marginBottom: '5rem',
  },
  [`& .${classes.emptyButton}`]: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  [`& .${classes.checkoutButton}`]: {
    minWidth: '150px',
    height: '40px',
  },
  [`& .${classes.link}`]: {
    textDecoration: 'none',
  },
  [`& .${classes.cardDetails}`]: {
    display: 'flex',
    marginTop: '10%',
    width: '100%',
    justifyContent: 'space-between',
  },
}));

const Cart = ({
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  onEmptyCart,
}: Props) => {
  const handleEmptyCart = () => onEmptyCart();

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link className={classes.link} to="/products">
        start adding some
      </Link>
      !
    </Typography>
  );

  if (!cart.line_items) return <div>Loading</div>;

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem
              item={lineItem}
              onUpdateCartQty={onUpdateCartQty}
              onRemoveFromCart={onRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5" component="h2">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Root>
      <Typography className={classes.title} variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? renderEmptyCart() : renderCart()}
    </Root>
  );
};

export default Cart;
