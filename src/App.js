import React, { useEffect, Suspense } from 'react';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  let routes = (
    <>
      <Route path='/auth' render={() => <Auth />} />
      <Route
        path='/'
        exact
        component={BurgerBuilder}
      />
      <Redirect to='/' />
    </>
  );

  if (props.isAuthenticated) {
    routes = (
      <>
        <Route
          path='/checkout'
          render={() => <Checkout />}
        />
        <Route
          path='/orders'
          render={() => <Orders />}
        />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' render={() => <Auth />} />
        <Route
          path='/'
          exact
          component={BurgerBuilder}
        />
        <Redirect to='/' />
      </>
    );
  }
  return (
    <>
      <Layout>
        <Suspense fallback={<Spinner />}>
          {routes}
        </Suspense>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (disaptch) => {
  return {
    onTryAutoSignup: () =>
      disaptch(actions.authCheckState()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
