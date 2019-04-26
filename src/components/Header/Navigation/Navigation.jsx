import React from "react";
import style from "./Navigation.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navigation = props => {
  return (
    <div className={style.headerLinks}>
      <Link to="/profilePage" className={style.link}>
        #profile page
      </Link>
      <Link to="/dashboard" className={style.link}>
        #post list
      </Link>
      <p onClick={props.logoutAndClearSession} className={style.link}>
        #log out
      </p>
    </div>
  );
};

Navigation.propTypes = {
  logoutAndClearSession: PropTypes.func
};

export default Navigation;
