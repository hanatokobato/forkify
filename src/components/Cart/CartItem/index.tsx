import React, { useContext } from 'react';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  styled,
  Box,
} from '@mui/material';
import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartQtyMutation,
} from '../../../generated/graphql';
import { AuthContext } from '../../../context/AuthContext';

export interface Item {
  id: number;
  name: string;
  quantity: number;
  image: {
    url: string;
  };
  line_total: {
    formatted_with_symbol: string;
  };
}

interface Props {
  item: Item;
}

const PREFIX = 'CartItem';

const classes = {
  cardItem: `${PREFIX}-item`,
  media: `${PREFIX}-content`,
  cardContent: `${PREFIX}-cardContent`,
  cardActions: `${PREFIX}-cardActions`,
  buttons: `${PREFIX}-buttons`,
};

const Root = styled(Card)(({ theme }) => ({
  [`&.${classes.cardItem}`]: {
    display: 'flex',
    padding: '12px 15px',
    flexDirection: 'column',
  },
  [`& .${classes.media}`]: {
    width: 100,
    height: 100,
  },
  [`& .${classes.cardContent}`]: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  [`& .${classes.cardActions}`]: {
    justifyContent: 'space-between',
  },
  [`& .${classes.buttons}`]: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const CartItem = ({ item }: Props) => {
  const { currentUser } = useContext(AuthContext);
  const { refetch } = useGetCartQuery({
    variables: { userId: currentUser!.id },
  });
  const [updateCartQty] = useUpdateCartQtyMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  const handleUpdateCartQty = (lineItemId: number, adjustQty: number) => {
    updateCartQty({ variables: { itemId: lineItemId, adjustQty } });
  };

  const handleRemoveFromCart = async (lineItemId: number) => {
    await removeCartItem({ variables: { id: lineItemId } });
    refetch();
  };

  return (
    <Root className={classes.cardItem}>
      <Box sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          image={item.image.url}
          className={classes.media}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h5" sx={{ fontSize: '2rem' }}>
            {item.name}
          </Typography>
        </CardContent>
      </Box>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item.id, -1)}
          >
            -
          </Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item.id, 1)}
          >
            +
          </Button>
        </div>
        <Typography variant="h5" sx={{ fontSize: '2rem' }}>
          {item.line_total.formatted_with_symbol}
        </Typography>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Root>
  );
};

export default CartItem;
