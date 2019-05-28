import React from "react";
import { Route } from "react-router-dom";
import Login from "../components/Login/Login";
import PropTypes from "prop-types";

// Components
import ToggleChat from "./Chat/ToggleChat/ToggleChat";
import Chat from "./Chat/Chat";

export default class PrivateRoute extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.logged !== nextProps.logged;
  }
  render() {
    const { component: Component, logged } = this.props;
    return (
      <Route
        {...this.props}
        component={() => {
          return logged ? (
            <React.Fragment>
              <ToggleChat />
              <Component
                logoutAndClearSession={this.props.logoutAndClearSession}
              />

              <Chat />
            </React.Fragment>
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
  logoutAndClearSession: PropTypes.func
};
