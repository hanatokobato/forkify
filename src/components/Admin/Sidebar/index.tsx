import {
  LineStyle,
  PermIdentity,
  Storefront,
  Public,
} from '@mui/icons-material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './index.module.scss';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarWrapper}>
        <div className={classes.sidebarMenu}>
          <h3 className={classes.sidebarTitle}>Dashboard</h3>
          <ul className={classes.sidebarList}>
            <Link to="/admin" className={classes.link}>
              <li
                className={`${classes.sidebarListItem} ${
                  location.pathname === '/admin' ? classes.active : ''
                }`}
              >
                <LineStyle className={classes.sidebarIcon} />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className={classes.sidebarMenu}>
          <h3 className={classes.sidebarTitle}>Quick Menu</h3>
          <ul className={classes.sidebarList}>
            <Link to="/admin/users" className={classes.link}>
              <li
                className={`${classes.sidebarListItem} ${
                  location.pathname === '/admin/users' ? classes.active : ''
                }`}
              >
                <PermIdentity className={classes.sidebarIcon} />
                Users
              </li>
            </Link>
            <Link to="/admin/products" className={classes.link}>
              <li
                className={`${classes.sidebarListItem} ${
                  location.pathname === '/admin/products' ? classes.active : ''
                }`}
              >
                <Storefront className={classes.sidebarIcon} />
                Products
              </li>
            </Link>
            <Link to="/admin/countries" className={classes.link}>
              <li
                className={`${classes.sidebarListItem} ${
                  location.pathname === '/admin/countries' ? classes.active : ''
                }`}
              >
                <Public className={classes.sidebarIcon} />
                Countries
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
