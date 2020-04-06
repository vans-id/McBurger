import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {
  updateObject,
  checkValidity,
} from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 8,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    if (
      !this.props.buildingBurger &&
      this.props.authRedirectPath !== '/'
    ) {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangeHandler = (e, controlName) => {
    const updatedControls = updateObject(
      this.state.controls,
      {
        [controlName]: updateObject(
          this.state.controls[controlName],
          {
            value: e.target.value,
            valid: checkValidity(
              e.target.value,
              this.state.controls[controlName]
                .validation
            ),
            touched: true,
          }
        ),
      }
    );

    this.setState({ controls: updatedControls });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementsArray.map(
      (formElement) => (
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
            this.inputChangeHandler(e, formElement.id)
          }
        />
      )
    );

    // render error message
    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <div className={classes.Alert}>
          {this.props.error.message}
        </div>
      );
    }

    // Render form
    let renderedForm = (
      <>
        <h2>SIGN IN</h2>
        <div>Don't have an account?</div>
        <Button
          btnType='Failed'
          clicked={this.switchAuthModeHandler}
        >
          SIGN UP
        </Button>
        <form onSubmit={this.submitHandler}>
          {form}
          {errorMessage}
          <Button btnType='Success'>LOGIN</Button>
        </form>
      </>
    );

    if (this.state.isSignup) {
      renderedForm = (
        <>
          <h2>CREATE AN ACCOUNT</h2>
          <div>Already have an account?</div>
          <Button
            btnType='Failed'
            clicked={this.switchAuthModeHandler}
          >
            SIGN IN
          </Button>
          <form onSubmit={this.submitHandler}>
            {form}
            {errorMessage}
            <Button btnType='Success'>REGISTER</Button>
          </form>
        </>
      );
    }

    // Show Spinner while loading
    if (this.props.loading) {
      renderedForm = <Spinner />;
    }

    // Redirect User
    let authRedirect = null;

    if (this.props.isAuthenticated) {
      authRedirect = (
        <Redirect to={this.props.authRedirectPath} />
      );
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {renderedForm}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(
        actions.auth(email, password, isSignup)
      ),
    onSetAuthRedirectPath: () =>
      dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
