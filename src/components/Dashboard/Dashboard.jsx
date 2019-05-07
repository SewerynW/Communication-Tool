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
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

class Dashboard extends React.Component {
  state = {
    query: "",
    hintPopUp: null,
    friend: {
      friendId: "",
      show: false
    }
  };

  handleClick = () => {
    this.props.history.push("/newPost");
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
    const { hintPopUp } = this.state;
    console.log("ze stora", foundPeople);

    const additionalStyle = {
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
          <div className={`${style.sideBox} ${style.posts}`}>
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
          <div className={`${style.sideBox} ${style.friends}`}>
            <h2>Friends</h2>
            <Search
              additionalStyle={additionalStyle}
              handleInputChanges={this.handleFriendsInputChanges}
              filteredData={foundPeople}
              dataType={dataType}
              handleCloseHintPopUp={this.handleCloseHintPopUp}
              hintPopUp={hintPopUp}
            />
            <div>
              <FriendsList />
            </div>
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
