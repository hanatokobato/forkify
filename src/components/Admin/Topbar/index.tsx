import {
  AccountCircle,
} from '@mui/icons-material';
import React from 'react';
import classes from './index.module.scss';
import logo from '../../../images/logo.png';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useLogout } from '../../../utils/auth';

const Topbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const logout = useLogout();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.topbar}>
      <div className={classes.topbarWrapper}>
        <div className={classes.topLeft}>
          <img
            src={logo}
            alt="forkify"
            height="25px"
            className={classes.image}
          />
        </div>
        <div className={classes.topRight}>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={logout}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
