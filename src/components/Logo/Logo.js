import React from 'react';

import burgerLogo from '../../assets/images/logo.png';
import classes from './Logo.module.css';

export default function Logo(props) {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt='McBurger' />
    </div>
  );
}
