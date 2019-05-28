import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import style from "./Footer.module.scss";


const stylesMaterialUi = theme => ({
  appBar: {
    top: "auto",
    bottom: 0,
  }
});

const Footer = (props) => {
  const { classes } = props;
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={style.FooterToolbar}>
        &copy; {new Date().getFullYear()} Copyright: DreamTeam
            </Toolbar>
    </AppBar>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(stylesMaterialUi)(Footer);
