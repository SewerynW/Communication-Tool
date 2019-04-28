import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Typography, InputBase, Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";
import style from "./Header.module.scss";
import AvatarPhoto from "../../assets/janedoe.jpg";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { filterPosts } from "../../actions/postActions";

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
    if (queryFromInput.length > 0) {
      this.props.filterPosts(queryFromInput);
      this.setState(() => ({ hintPopUp: true }));
    }
    if (!queryFromInput) {
      this.handleCloseHintPopUp();
    }
  };

  render() {
    const {
      classes,
      logged,
      logoutAndClearSession,
      location,
      filteredUserPosts,
      userProfile
    } = this.props;
    const { hintPopUp } = this.state;
    const path =
      location.pathname !== "/dashboard" && location.pathname !== "/";
    const welcome = `Hi ${userProfile.Name}`;

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
            {path ? (
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
                    filteredPosts={filteredUserPosts}
                    handleCloseHintPopUp={this.handleCloseHintPopUp}
                    handleTogglePopup={this.handleTogglePopup}
                  />
                ) : null}
              </div>
            ) : null}
            <div className={style.rightBar}>
              <div className={style.personalBar}>
                <Typography
                  className={`${style.welcomeText} ${classes.typography}`}
                >
                  {userProfile.Name !== (null || undefined) ? welcome : "Hi"}
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

const mapStateToProps = state => ({
  filteredUserPosts: state.postReducer.filteredUserPosts,
  userProfile: state.profileReducer
});

const mapDispatchToProps = dispatch => {
  return {
    filterPosts: query => {
      dispatch(filterPosts(query));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Header))
);
