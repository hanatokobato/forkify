import { AddShoppingCart } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';

const PREFIX = 'Product';

interface Props {
  product: Product;
  onAddToCart: any;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: { formatted: string };
  image: { url: string };
}

const classes = {
  root: `${PREFIX}-root`,
  media: `${PREFIX}-media`,
  cardContent: `${PREFIX}-CardContent`,
  cardActions: `${PREFIX}-CardActions`,
};

const Root = styled(Card)(({ theme }) => ({
  [`&.${classes.root}`]: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 10px',
  },
  [`& .${classes.media}`]: {
    width: 150,
    height: 150,
  },
  [`& .${classes.cardContent}`]: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  [`& .${classes.cardActions}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
}));

const Product = ({ product, onAddToCart }: Props) => {
  const handleAddToCart = () => onAddToCart(product.id, 1);

  return (
    <Root className={classes.root}>
      <CardContent>
        <div className={classes.cardContent}>
          <Typography
            noWrap
            gutterBottom
            variant="h5"
            sx={{ fontSize: '2rem' }}
          >
            {product.name}
          </Typography>
        </div>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardMedia
          className={classes.media}
          image={product.image.url}
          title={product.name}
        />
        <CardActions disableSpacing className={classes.cardActions}>
          <Typography gutterBottom variant="h5" sx={{ fontSize: '2rem' }}>
            ${product.price.formatted}
          </Typography>
          <Typography
            dangerouslySetInnerHTML={{ __html: product.description }}
            variant="body2"
            color="textSecondary"
            component="p"
          />
          <IconButton
            aria-label="Add to Cart"
            onClick={handleAddToCart}
            color="primary"
          >
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Box>
    </Root>
  );
};

export default Product;
