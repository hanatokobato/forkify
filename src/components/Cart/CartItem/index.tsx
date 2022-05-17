import React from 'react';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  styled,
} from '@mui/material';

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
  onUpdateCartQty: any;
  onRemoveFromCart: any;
}

const PREFIX = 'CartItem';

const classes = {
  media: `${PREFIX}-content`,
  cardContent: `${PREFIX}-cardContent`,
  cardActions: `${PREFIX}-cardActions`,
  buttons: `${PREFIX}-buttons`,
};

const Root = styled(Card)(({ theme }) => ({
  [`& .${classes.media}`]: {
    height: 260,
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

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }: Props) => {
  const handleUpdateCartQty = (lineItemId: number, newQuantity: number) =>
    onUpdateCartQty(lineItemId, newQuantity);

  const handleRemoveFromCart = (lineItemId: number) =>
    onRemoveFromCart(lineItemId);

  return (
    <Root className="cart-item">
      <CardMedia
        image={item.image.url}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography noWrap variant="h4">{item.name}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Typography variant="h5">
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
