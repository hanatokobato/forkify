import { AddShoppingCart } from '@mui/icons-material';
import {
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
  },
  [`& .${classes.media}`]: {
    height: 0,
    paddingTop: '56.25%',
  },
  [`& .${classes.cardContent}`]: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  [`& .${classes.cardActions}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const Product = ({ product }: Props) => {
  return (
    <Root className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.image.url}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography noWrap gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
          component="p"
        />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Typography gutterBottom variant="h5" component="h2">
          ${product.price.formatted}
        </Typography>
        <IconButton aria-label="Add to Cart">
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Root>
  );
};

export default Product;
