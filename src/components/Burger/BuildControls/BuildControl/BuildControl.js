import React from 'react';

import classes from './BuildControl.module.css';

export default function BuildControl(props) {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>
        {props.label}
      </div>
      <div className={classes.Control}>
        <button
          className={classes.Less}
          onClick={props.remove}
          disabled={props.disabled}
        >
          -
        </button>
        <span>{props.ingredient}</span>
        <button
          className={classes.More}
          onClick={props.added}
        >
          +
        </button>
      </div>
    </div>
  );
}
