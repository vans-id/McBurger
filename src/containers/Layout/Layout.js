import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(
    false
  );

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <>
      <SideDrawer
        closed={sideDrawerClosedHandler}
        open={showSideDrawer}
        isAuth={props.isAuthenticated}
      />
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClick={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>
        {props.children}
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
