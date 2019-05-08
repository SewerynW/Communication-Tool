import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import style from "./Dashboard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Redux
import { connect } from "react-redux";
import { filterPosts } from "../../actions/postActions";
import { findFriends, addFriend } from "../../actions/friendsActions";

// Components
import PostsList from "../PostsList/PostsList";
import Search from "../Search/Search";
import FriendsList from "../FriendsList/FriendsList";

const styles = theme => ({
  button: {
    marginBottom: "10px",
    width: "100%"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  formControl: {
    marginBottom: "20px",
    width: "100%"
  }
});

class Dashboard extends React.Component {
  state = {
    query: "",
    hintPopUp: null,
    friend: {
      friendId: "",
      show: false
    },
    mobileFeatureStatus: false
  };

  handleClick = () => {
    this.props.history.push("/newPost");
  };

  handlerClickIcons = () => {
    const friends = document.getElementById("friends");
    const posts = document.getElementById("posts");
    let style = this.state.mobileFeatureStatus ? "none" : "flex";
    friends.style.display = style;
    posts.style.display = style;
    this.setState(() => ({
      mobileFeatureStatus: !this.state.mobileFeatureStatus
    }));
  };

  handlePostsInputChanges = event => {
    let queryFromInput = event.target.value;
    this.setState(() => ({
      query: queryFromInput
    }));
    this.props.filterPosts(queryFromInput);
  };

  handleCloseHintPopUp = () => {
    this.setState(() => ({ hintPopUp: false }));
  };

  handleFriendsInputChanges = event => {
    let queryFromInput = event.target.value;
    if (queryFromInput.length > 0) {
      this.props.findFriends(queryFromInput);
      this.setState(() => ({ hintPopUp: true }));
    }
    if (!queryFromInput) {
      this.handleCloseHintPopUp();
    }
  };

  render() {
    const { classes, foundPeople, dataType } = this.props;
    const { hintPopUp, mobileFeatureStatus } = this.state;
    const additionalStyle = {
      position: "absolute",
      top: "40px",
      right: "0",
      maxHeight: "425px",
      border: "1px solid #3f51b5",
      overflow: "auto",
      width: "265px"
    };

    return (
      <div className={style.container}>
        <PostsList
          userPosts={
            this.state.query.length
              ? this.props.filteredUserPosts
              : this.props.userPosts
          }
        />
        <div className={style.features}>
          <div className={`${style.sideBox} ${style.posts}`} id="posts">
            <h2>Posts</h2>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Search Post</InputLabel>
              <Input
                id="component-simple"
                onChange={this.handlePostsInputChanges}
              />
            </FormControl>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={this.handleClick}
            >
              New Post
              <FontAwesomeIcon
                icon="envelope"
                size="lg"
                className={classes.rightIcon}
              />
            </Button>
          </div>
          <div className={`${style.sideBox} ${style.friends}`} id="friends">
            <h2>Friends</h2>
            <div className={style.search}>
              <Search
                additionalStyle={additionalStyle}
                handleInputChanges={this.handleFriendsInputChanges}
                filteredData={foundPeople}
                dataType={dataType}
                handleCloseHintPopUp={this.handleCloseHintPopUp}
                hintPopUp={hintPopUp}
              />
            </div>

            <div>
              <FriendsList />
            </div>
          </div>
          <div className={`${style.sideBox} ${style.toggle}`}>
            <FontAwesomeIcon
              icon={
                mobileFeatureStatus ? "arrow-circle-right" : "arrow-circle-left"
              }
              size="2x"
              onClick={this.handlerClickIcons}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userPosts: state.postReducer.userPosts,
  filteredUserPosts: state.postReducer.filteredUserPosts,
  foundPeople: state.friendsReducer.foundPeople,
  dataType: state.friendsReducer.type
});

const mapDispatchToProps = dispatch => {
  return {
    filterPosts: query => {
      dispatch(filterPosts(query));
    },
    findFriends: query => {
      dispatch(findFriends(query));
    },
    addFriend: friend => {
      dispatch(addFriend(friend));
    }
  };
};

Dashboard.propTypes = {
  classes: PropTypes.object,
  userPosts: PropTypes.array
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Dashboard))
);
