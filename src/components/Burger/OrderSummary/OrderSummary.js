import React from 'react';
import Button from '../../UI/Button/Button';

export default function OrderSummary(props) {
  const ingredientSummary = Object.keys(
    props.ingredients
  ).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: 'capitalize' }}>
        {igKey}
      </span>{' '}
      : {props.ingredients[igKey]}
    </li>
  ));

  return (
    <>
      <h3>Your Order</h3>
      <p>
        A delicious burger with following ingredients:
      </p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>
          Total Price : &euro; {props.price.toFixed(2)}
        </strong>
      </p>
      <p>Continue to Checkout?</p>
      <hr />
      <Button
        btnType='Failed'
        clicked={props.purchaseCancelled}
      >
        CANCEL
      </Button>
      <Button
        btnType='Success'
        clicked={props.purchaseContinued}
      >
        CONTINUE
      </Button>
    </>
  );
}
