import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Typography, Avatar } from "@material-ui/core";
import style from "./Header.module.scss";
import AvatarPhoto from "../../assets/profile.png";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { filterPosts } from "../../actions/postActions";

import MobileMenu from "./MobileMenu/MobileMenu";
import Navigation from "./Navigation/Navigation";
import Search from "../Search/Search";

const styles = theme => ({
  root: {
    flexDirection: "row"
  },
  typography: {
    fontFamily: "'Oleo Script', cursive",
    color: "inherit"
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
      userProfile,
      dataType
    } = this.props;
    const { hintPopUp } = this.state;
    const path =
      location.pathname !== "/dashboard" && location.pathname !== "/";
    console.log("z profilu", userProfile);
    const welcome = `Hi ${userProfile.GivenName}`;

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
              <Search
                handleInputChanges={this.handleInputChanges}
                filteredData={filteredUserPosts}
                handleCloseHintPopUp={this.handleCloseHintPopUp}
                hintPopUp={hintPopUp}
                dataType={dataType}
              />
            ) : null}
            <div className={style.rightBar}>
              <div className={style.personalBar}>
                <Typography
                  className={`${style.welcomeText} ${classes.typography}`}
                >
                  {userProfile.GivenName !== (null || undefined)
                    ? welcome
                    : "Hi"}
                </Typography>
                <Avatar
                  alt="Remy Sharp"
                  src={userProfile.Photo ? userProfile.Photo : AvatarPhoto}
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
  userProfile: state.profileReducer.userProfile,
  dataType: state.postReducer.type
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
