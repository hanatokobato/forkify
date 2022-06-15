import React, { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  styled,
  Typography,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Search from '../Search';
import { useAuth0 } from '@auth0/auth0-react';
import logo from '../../images/logo.png';
import HeaderMenu from './HeaderMenu';
import LoginButton from '../LoginButton';
import { useGetCartLazyQuery } from '../../generated/graphql';
import { AuthContext } from '../../context/AuthContext';

const PREFIX = 'Header';

const classes = {
  appBar: `${PREFIX}-appBar`,
  toolBar: `${PREFIX}-toolBar`,
  grow: `${PREFIX}-grow`,
  image: `${PREFIX}-image`,
  button: `${PREFIX}-button`,
};

const Root = styled(AppBar)(({ theme }) => ({
  [`&.${classes.appBar}`]: {
    backgroundColor: '#f9f5f3',
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - 0px)`,
      marginLeft: 0,
    },
  },
  [`& .${classes.toolBar}`]: {
    height: '100%',
    justifyContent: 'space-between',
  },
  [`& .${classes.grow}`]: {
    flexGrow: 1,
  },
  [`& .${classes.image}`]: {
    height: '4.6rem',
  },
  [`& .${classes.button}`]: {},
}));

const Header = ({
  openNewRecipeHandler,
}: {
  openNewRecipeHandler: () => void;
}) => {
  const { currentUser } = useContext(AuthContext);
  const { isAuthenticated } = useAuth0();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [getCart, { data: cartData }] = useGetCartLazyQuery();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  useEffect(() => {
    currentUser && getCart({ variables: { userId: currentUser.id } });
  }, [currentUser, getCart]);

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          component={Link}
          to="/cart"
          aria-label="Show cart items"
          color="inherit"
        >
          <Badge
            badgeContent={cartData?.cart?.totalItems || 0}
            color="secondary"
          >
            <ShoppingCart fontSize="medium" />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Root position="static" className={classes.appBar} color="inherit">
        <Toolbar className={classes.toolBar}>
          <Typography component={Link} to="/">
            <img
              src={logo}
              alt="forkify"
              height="25px"
              className={classes.image}
            />
          </Typography>
          <Search />
          <div className={classes.button}>
            {!isAuthenticated && <LoginButton className="nav__btn" />}
            {isAuthenticated && (
              <>
                <IconButton
                  component={Link}
                  to="/cart"
                  aria-label="Show cart items"
                  color="inherit"
                  size="medium"
                >
                  <Badge
                    badgeContent={cartData?.cart?.totalItems || 0}
                    color="secondary"
                  >
                    <ShoppingCart fontSize="medium" color="primary" />
                  </Badge>
                </IconButton>
                <HeaderMenu openNewRecipeHandler={openNewRecipeHandler} />
              </>
            )}
          </div>
        </Toolbar>
      </Root>
      {renderMobileMenu}
    </>
  );
};

export default Header;
