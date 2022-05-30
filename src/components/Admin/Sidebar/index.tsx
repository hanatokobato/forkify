import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
import classes from './index.module.scss';

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarWrapper}>
        <div className={classes.sidebarMenu}>
          <h3 className={classes.sidebarTitle}>Dashboard</h3>
          <ul className={classes.sidebarList}>
            <Link to="/" className={classes.link}>
              <li className={`${classes.sidebarListItem} ${classes.active}`}>
                <LineStyle className={classes.sidebarIcon} />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className={classes.sidebarMenu}>
          <h3 className={classes.sidebarTitle}>Quick Menu</h3>
          <ul className={classes.sidebarList}>
            <Link to="/users" className={classes.link}>
              <li className={classes.sidebarListItem}>
                <PermIdentity className={classes.sidebarIcon} />
                Users
              </li>
            </Link>
            <Link to="/admin/products" className={classes.link}>
              <li className={classes.sidebarListItem}>
                <Storefront className={classes.sidebarIcon} />
                Products
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
