import {
  LineStyle,
  PermIdentity,
  Storefront,
  Public,
  SettingsApplications,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { Box, Collapse } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './index.module.scss';

interface CollapseMenu {
  settings: boolean;
}

const initCollapseMenu = {
  settings: false,
};

const Sidebar = () => {
  const location = useLocation();
  const [collapseMenu, setCollapseMenu] = useState<CollapseMenu>(
    initCollapseMenu
  );

  const handleCollapseMenu = useCallback((menuType: 'settings') => {
    setCollapseMenu((prev) => {
      return { ...prev, [menuType]: !prev[menuType] };
    });
  }, []);

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
            <a
              className={classes.link}
              onClick={() => handleCollapseMenu('settings')}
            >
              <li
                className={`${classes.sidebarListItem} ${classes.sidebarListItemCollapse}`}
              >
                <Box sx={{ display: 'flex' }}>
                  <SettingsApplications className={classes.sidebarIcon} />
                  Settings
                </Box>
                {collapseMenu.settings ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )}
              </li>
            </a>
            <Collapse in={collapseMenu.settings}>
              <Link to="/admin/settings/shipping" className={classes.link}>
                <li
                  className={`${classes.sidebarListItem} ${
                    classes.sidebarListItemChild
                  } ${
                    location.pathname === '/admin/settings/shipping'
                      ? classes.active
                      : ''
                  }`}
                >
                  Shipping
                </li>
              </Link>
            </Collapse>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
