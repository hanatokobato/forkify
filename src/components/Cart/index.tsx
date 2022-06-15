import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, styled } from '@mui/material';
import { Link } from 'react-router-dom';

import CartItem, { Item as LineItem } from './CartItem';
import {
  useClearCartMutation,
  useGetCartLazyQuery,
} from '../../generated/graphql';
import { AuthContext } from '../../context/AuthContext';
import { getDownloadUrl } from '../../utils/uploadImage';
import { moneyFomattedWithSymbol } from '../../utils/formater';

export interface Cart {
  total_items: number;
  line_items: LineItem[];
  subtotal: {
    formatted_with_symbol: string;
  };
}

const PREFIX = 'Cart';

const classes = {
  container: `${PREFIX}-container`,
  title: `${PREFIX}-title`,
  emptyButton: `${PREFIX}-emptyButton`,
  checkoutButton: `${PREFIX}-checkoutButton`,
  link: `${PREFIX}-link`,
  cardDetails: `${PREFIX}-cardDetails`,
};

const Root = styled(Container)(({ theme }) => ({
  [`&.${classes.container}`]: {
    backgroundColor: '#f9f5f3',
  },
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

const Cart = () => {
  const { currentUser } = useContext(AuthContext);
  const [getCart, { data: cartData, refetch }] = useGetCartLazyQuery();
  const [clearCart] = useClearCartMutation();
  const cart = cartData?.cart;
  const [lineItems, setLineItems] = useState<LineItem[]>([]);

  const handleEmptyCart = async () => {
    await clearCart({ variables: { cartId: cartData!.cart!.id } });
    refetch();
  };

  const formatLineItems: () => Promise<LineItem[]> = useCallback(async () => {
    if (cartData) {
      return await Promise.all(
        cartData.cart!.lineItems!.map(async (p) => {
          const url = await getDownloadUrl(p.photo!);

          const formattedItems = {
            id: +p.id,
            name: p.name!,
            quantity: p.quantity,
            line_total: {
              formatted_with_symbol: (
                Math.round(p.lineTotal! * 100) / 100
              ).toFixed(2),
            },
            image: {
              url,
            },
          };
          return formattedItems;
        })
      );
    } else {
      return [];
    }
  }, [cartData]);

  const storeLineItems = useCallback(async () => {
    const items = await formatLineItems();
    setLineItems(items);
  }, [formatLineItems]);

  useEffect(() => {
    if (currentUser) getCart({ variables: { userId: currentUser.id } });
  }, [currentUser, getCart]);

  useEffect(() => {
    storeLineItems();
  }, [storeLineItems]);

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link className={classes.link} to="/products">
        start adding some
      </Link>
      !
    </Typography>
  );

  if (!cart?.lineItems) return <div>Loading</div>;

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {lineItems.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem item={lineItem} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5" component="h2">
          Subtotal: {moneyFomattedWithSymbol(cart.subtotal)}
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
    <Root className={classes.container}>
      <Typography className={classes.title} variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart?.lineItems?.length ? renderEmptyCart() : renderCart()}
    </Root>
  );
};

export default Cart;
