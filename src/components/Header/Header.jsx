import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Typography, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import { fade } from "@material-ui/core/styles/colorManipulator";
import style from "./Header.module.scss";
import AvatarPhoto from "../../assets/janedoe.jpg";

// Components
import ListOfHints from "./ListOfHints/ListOfHints";
import MobileMenu from "./MobileMenu/MobileMenu";
import Navigation from "./Navigation/Navigation";

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
    query: "",
    hintPopUp: null
  };

  handleCloseHintPopUp = () => {
    this.setState(() => ({ hintPopUp: false }));
  };

  handleInputChanges = event => {
    let queryFromInput = event.target.value;
    if (!queryFromInput) {
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
    const { classes, person, logged, logoutAndClearSession } = this.props;
    const { hintPopUp } = this.state;

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
            <Navigation logoutAndClearSession={logoutAndClearSession} />
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
                onChange={this.handleInputChanges}
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
                <MobileMenu logoutAndClearSession={logoutAndClearSession} />
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
