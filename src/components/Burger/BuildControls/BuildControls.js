import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import Carousel from '../../Carousel/Carousel';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

export default function BuildControls(props) {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price :{' '}
        <span>&euro; {props.price.toFixed(2)}</span>
      </p>

      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() =>
            props.ingredientAdded(ctrl.type)
          }
          remove={() =>
            props.ingredientRemove(ctrl.type)
          }
          disabled={props.disabled[ctrl.type]}
          ingredient={props.ingredients[ctrl.type]}
        />
      ))}

      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth
          ? 'ORDER NOW'
          : 'SIGN UP TO ORDER'}
      </button>

      <Carousel setMenu={props.setMenu} />
    </div>
  );
}
