import React from 'react';

import classes from './Order.module.css';

export default function Order(props) {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      ammount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(ig => (
    <span key={ig.name} className={classes.Ingredient}>
      {ig.name} {ig.ammount}x
    </span>
  ));

  return (
    <div className={classes.Order}>
      <div>Ingredients: </div>
      <p>{ingredientOutput}</p>

      <div>
        Price :{' '}
        <strong>
          &euro; {props.price.toFixed(2)}
        </strong>
      </div>
    </div>
  );
}
