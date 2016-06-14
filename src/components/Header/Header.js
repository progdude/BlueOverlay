import React from 'react';
import { Link } from 'react-router';
import classes from './Header.scss';

export const Header = () => (
  <div className={classes.header}>
    <Link to='/member' className={classes.headerBtn}>
      <img src='/images/icons/search.png' />
    </Link>
    <Link to='/member' className={classes.headerBtn}>
      <img src='/images/icons/log-off.png' />
    </Link>
    <Link to='/member' className={classes.headerAvatar}>
      <img src='/images/temp/avatar.jpg' />
    </Link>
  </div>
);

export default Header;