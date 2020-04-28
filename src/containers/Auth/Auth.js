import React, { useState, useEffect } from 'react';
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

const Auth = (props) => {
  const [authForm, setAuthForm] = useState({
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
  });
  const [isSignup, setIsSignup] = useState(false);
  const {
    buildingBurger,
    authRedirectPath,
    onSetAuthRedirectPath,
  } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [
    buildingBurger,
    authRedirectPath,
    onSetAuthRedirectPath,
  ]);

  const inputChangeHandler = (e, controlName) => {
    const updatedauthForm = updateObject(authForm, {
      [controlName]: updateObject(
        authForm[controlName],
        {
          value: e.target.value,
          valid: checkValidity(
            e.target.value,
            authForm[controlName].validation
          ),
          touched: true,
        }
      ),
    });
    setAuthForm(updatedauthForm);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAuth(
      authForm.email.value,
      authForm.password.value,
      isSignup
    );
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];

  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key],
    });
  }

  const form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(e) =>
        inputChangeHandler(e, formElement.id)
      }
    />
  ));

  // render error message
  let errorMessage = null;

  if (props.error) {
    errorMessage = (
      <div className={classes.Alert}>
        {props.error.message}
      </div>
    );
  }

  // Render form
  let renderedForm = (
    <>
      <h2>SIGN IN</h2>
      <img
        src={require('../../assets/images/login.jpg')}
        alt='login'
      />
      <div>Don't have an account?</div>
      <Button
        btnType='Failed'
        clicked={switchAuthModeHandler}
      >
        SIGN UP
      </Button>
      <form onSubmit={submitHandler}>
        {form}
        {errorMessage}
        <Button btnType='Success'>LOGIN</Button>
      </form>
    </>
  );

  if (isSignup) {
    renderedForm = (
      <>
        <h2>CREATE AN ACCOUNT</h2>
        <img
          src={require('../../assets/images/login.jpg')}
          alt='signup'
        />
        <div>Already have an account?</div>
        <Button
          btnType='Failed'
          clicked={switchAuthModeHandler}
        >
          SIGN IN
        </Button>
        <form onSubmit={submitHandler}>
          {form}
          {errorMessage}
          <Button btnType='Success'>REGISTER</Button>
        </form>
      </>
    );
  }

  // Show Spinner while loading
  if (props.loading) {
    renderedForm = <Spinner />;
  }

  // Redirect User
  let authRedirect = null;

  if (props.isAuthenticated) {
    authRedirect = (
      <Redirect to={props.authRedirectPath} />
    );
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {renderedForm}
    </div>
  );
};

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
