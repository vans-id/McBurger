import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {
  updateObject,
  checkValidity,
} from '../../../shared/utility';

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your name',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP code',
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumber: true,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your country',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    emailAdress: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your email',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    extras: {
      elementType: 'select',
      elementConfig: {
        options: [
          {
            value: 'none',
            displayValue: 'Select Extras',
          },
          {
            value: 'hot',
            displayValue: 'Extra Hot',
          },
          {
            value: 'cheese',
            displayValue: 'Extra Cheese',
          },
        ],
      },
      value: 'none',
      validation: {},
      valid: true,
    },
  });
  const [formIsValid, setFormIsValid] = useState(
    false
  );

  const orderHandler = (e) => {
    e.preventDefault();

    const formData = {};

    for (let key in orderForm) {
      formData[key] = orderForm[key].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangeHandler = (e, inputIdentifier) => {
    const updatedFormElement = updateObject(
      orderForm[inputIdentifier],
      {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          orderForm[inputIdentifier].validation
        ),
        touched: true,
      }
    );

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid =
        updatedOrderForm[inputIdentifier].valid &&
        formIsValid;
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];

  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={
            formElement.config.elementConfig
          }
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={
            formElement.config.validation
          }
          touched={formElement.config.touched}
          changed={(e) =>
            inputChangeHandler(e, formElement.id)
          }
        />
      ))}
      <Button
        btnType='Success'
        disabled={!formIsValid}
      >
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h2>Enter Your Contact Data</h2>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => {
      dispatch(
        actions.purchaseBurger(orderData, token)
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
