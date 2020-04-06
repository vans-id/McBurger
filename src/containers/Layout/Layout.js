import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState(prevState => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      };
    });
  };

  render() {
    return (
      <>
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
          isAuth={this.props.isAuthenticated}
        />
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClick={
            this.sideDrawerClosedHandler
          }
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
