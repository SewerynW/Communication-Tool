import React from "react";
import { Route } from "react-router-dom";
import Login from "../components/Login/Login";
import PropTypes from "prop-types";

export default class PrivateRoute extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (this.props.logged !== nextProps.logged)
  }
  render() {
    const { component: Component, logged } = this.props;
    return (
      <Route
        {...this.props}
        component={() => {
          return logged ? (
            <Component logoutAndClearSession={this.props.logoutAndClearSession}  logged={this.props.logged} person={this.props.person} />
          ) : (
              <Login setSession={this.props.setSession} path={this.props.path} />
            );
        }}
      />
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  setSession: PropTypes.func,
  path: PropTypes.string,
  logged: PropTypes.bool,
  person: PropTypes.object
}

