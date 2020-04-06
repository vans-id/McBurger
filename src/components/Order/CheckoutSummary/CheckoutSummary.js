import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

export default function CheckoutSummary(props) {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We Hope It Tastes Well!</h1>
      <div
        style={{
          width: '100%',
          margin: 'auto'
        }}
      >
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        btnType='Failed'
        clicked={props.checkoutCanceled}
      >
        CANCEL
      </Button>
      <Button
        btnType='Success'
        clicked={props.checkoutContinued}
      >
        CONTINUE
      </Button>
    </div>
  );
}
