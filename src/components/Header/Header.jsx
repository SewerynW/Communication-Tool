import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  InputBase
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import { fade } from "@material-ui/core/styles/colorManipulator";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AvatarPhoto from "../../assets/janedoe.jpg";

import ListOfHints from "./ListOfHints/ListOfHints";

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexDirection: "row"
  },
  typography: {
    fontFamily: "'Oleo Script', cursive",
    color: "inherit"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  avatar: {
    margin: 10
  }
});

class Header extends React.Component {
  state = {
    anchorEl: null,
    query: "",
    hintPopUp: null
  };

  handleMenu = event => {
    this.setState(() => {
      return { anchorEl: event.currentTarget };
    });
  };

  handleClose = () => {
    this.setState(() => ({ anchorEl: null }));
  };

  handleCloseHintPopUp = () => {
    console.log("zamykam liste podpowiedzi ", this.state.hintPopUp);
    this.setState(() => {
      return {
        hintPopUp: false
      };
    });
  };

  handleClick = event => {
    this.setState(() => {
      return { anchorEl: event.currentTarget };
    });
  };

  handleChange = event => {
    let queryFromInput = event.target.value;
    if (!queryFromInput) {
      console.log("jestem pusty");
      this.handleCloseHintPopUp();
    }
    this.setState(() => {
      return {
        query: queryFromInput,
        hintPopUp: true
      };
    });
  };

  render() {
    const { classes, person, logged } = this.props;
    const { anchorEl, hintPopUp } = this.state;
    const open = Boolean(anchorEl);

    let filteredPosts = this.props.userPosts.filter(post => {
      return (
        post.Title.toLowerCase().indexOf(this.state.query.toLowerCase()) !==
          -1 ||
        post.Text.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1
      );
    });

    return (
      <AppBar position="sticky" className={`${style.appBar} ${classes.root} `}>
        <Typography
          variant="h4"
          className={`${style.textLogo} ${classes.typography}`}
        >
          Dream Communicator
        </Typography>

        {logged ? (
          <React.Fragment>
            <div className={style.headerLinks}>
              <Link to="/profilePage" className={style.link}>
                #profile page
              </Link>
              <Link to="/dashboard" className={style.link}>
                #post list
              </Link>
              <p onClick={this.props.handleOnClick} className={style.link}>
                #log out
              </p>
            </div>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={this.handleChange}
              />
              {hintPopUp ? (
                <ListOfHints
                  id="listOfHints"
                  filteredPosts={filteredPosts}
                  handleCloseHintPopUp={this.handleCloseHintPopUp}
                  handleTogglePopup={this.handleTogglePopup}
                />
              ) : null}
            </div>

            <div className={style.rightBar}>
              <div className={style.personalBar}>
                <Typography
                  className={`${style.welcomeText} ${classes.typography}`}
                >
                  {`Hi ${person.name}`}
                </Typography>
                <Avatar
                  alt="Remy Sharp"
                  src={AvatarPhoto}
                  className={classes.avatar}
                />
              </div>
              <div className={style.mobileMenu}>
                <IconButton
                  aria-label="More"
                  aria-owns={open ? "long-menu" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  color="inherit"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: 200
                    }
                  }}
                >
                  <MenuItem onClick={this.handleClose}>
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
                    <p
                      onClick={this.props.handleOnClick}
                      className={style.linkMobileMenu}
                    >
                      #log out
                    </p>
                  </MenuItem>
                  )}
                </Menu>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
