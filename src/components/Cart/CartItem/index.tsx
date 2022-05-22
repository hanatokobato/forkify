import React from 'react';
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

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }: Props) => {
  const handleUpdateCartQty = (lineItemId: number, newQuantity: number) =>
    onUpdateCartQty(lineItemId, newQuantity);

  const handleRemoveFromCart = (lineItemId: number) =>
    onRemoveFromCart(lineItemId);

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
