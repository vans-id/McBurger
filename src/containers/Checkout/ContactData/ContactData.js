import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
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
    },
    formIsValid: false,
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid =
        value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid =
        value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  orderHandler = (e) => {
    e.preventDefault();

    const formData = {};

    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangeHandler = (e, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };

    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[
      inputIdentifier
    ] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid =
        updatedOrderForm[inputIdentifier].valid &&
        formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid,
    });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={
              formElement.config.elementType
            }
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
              this.inputChangeHandler(
                e,
                formElement.id
              )
            }
          />
        ))}
        <Button
          btnType='Success'
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h2>Enter Your Contact Data</h2>
        {form}
      </div>
    );
  }
}
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
