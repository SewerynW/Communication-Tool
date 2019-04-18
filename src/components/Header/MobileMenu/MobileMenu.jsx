import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import style from "./MobileMenu.module.scss";
import { withStyles } from "@material-ui/core/styles";
import { noAuto } from "@fortawesome/fontawesome-svg-core";

const styles = () => ({
  // paper: {
  //   left: "auto",
  //   rigth: "15px"
  // }
});

class MobileMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { logoutAndClearSession, classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
        <Menu
          className={classes.paper}
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={this.handleClose}
          disableAutoFocusItem={true}
        >
          <MenuItem
            onClick={this.handleClose}
            className={style.mobileMenuLinks}
          >
            <Link to="/dashboard" className={style.linkMobileMenu}>
              #post list
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/profilePage" className={style.linkMobileMenu}>
              #profile page
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <p onClick={logoutAndClearSession} className={style.linkMobileMenu}>
              #log out
            </p>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(MobileMenu);
