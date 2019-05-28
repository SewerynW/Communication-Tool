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
import {
  findFriends,
  addFriend,
  filterFriends
} from "../../actions/friendsActions";
import { toggleFilterFriends } from "../../actions/stateActions";

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
    queryPost: "",
    queryFriends: "",
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
    const arrowIcon = document.getElementById("arrowIcon");
    let styles = this.state.mobileFeatureStatus ? "none" : "flex";

    if (this.state.mobileFeatureStatus) {
      arrowIcon.style.top = "90px";
      arrowIcon.style.bottom = "auto";
    } else {
      arrowIcon.style.top = "auto";
      arrowIcon.style.bottom = "52px";
    }
    friends.style.display = styles;
    posts.style.display = styles;
    this.setState(() => ({
      mobileFeatureStatus: !this.state.mobileFeatureStatus
    }));
  };

  handlePostsInputChanges = event => {
    let queryFromInput = event.target.value;
    this.setState(() => ({
      queryPost: queryFromInput
    }));
    this.props.filterPosts(queryFromInput);
  };

  handleCloseHintPopUp = () => {
    this.setState(() => ({ hintPopUp: false }));
  };

  handleFriendsInputChanges = event => {
    let queryFromInput = event.target.value;

    if (this.props.activeFilter) {
      this.setState(() => ({
        queryFriends: queryFromInput
      }));
      this.props.filterFriends(queryFromInput);
    } else {
      if (queryFromInput.length > 0) {
        this.props.findFriends(queryFromInput);
        this.setState(() => ({ hintPopUp: true }));
      }
      if (!queryFromInput) {
        this.handleCloseHintPopUp();
      }
    }
  };

  handleClickFilterIcon = () => {
    const filter = document.getElementById("filterIcon");
    let style = this.props.activeFilter ? "gray" : "black";
    filter.style.color = style;
    this.props.toggleFilterFriends();
  };

  render() {
    const {
      classes,
      foundPeople,
      dataType,
      filteredUserPosts,
      userPosts,
      myFriends,
      filteredMyFriends
    } = this.props;
    const {
      hintPopUp,
      mobileFeatureStatus,
      queryPost,
      queryFriends
    } = this.state;
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

        <div className={`${style.sideBox} ${style.toggle}`} id="arrowIcon">
          <FontAwesomeIcon
            icon={
              mobileFeatureStatus ? "arrow-circle-right" : "arrow-circle-left"
            }
            size="2x"
            onClick={this.handlerClickIcons}
          />
        </div>
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
              <FontAwesomeIcon
                id="filterIcon"
                icon="filter"
                size="lg"
                className={style.filterIcon}
                onClick={this.handleClickFilterIcon}
              />
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
              <FriendsList
                myFriends={queryFriends.length ? filteredMyFriends : myFriends}
              />
            </div>
          </div>
        </div>
        <PostsList
          userPosts={queryPost.length ? filteredUserPosts : userPosts}
          myFriends={this.props.myFriends}

        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userPosts: state.postReducer.userPosts,
  filteredUserPosts: state.postReducer.filteredUserPosts,
  foundPeople: state.friendsReducer.foundPeople,
  dataType: state.friendsReducer.type,
  activeFilter: state.stateReducer.activeFilter,
  myFriends: state.friendsReducer.myFriends,
  filteredMyFriends: state.friendsReducer.filteredMyFriends
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
    },
    toggleFilterFriends: () => {
      dispatch(toggleFilterFriends());
    },
    filterFriends: query => {
      dispatch(filterFriends(query));
    }
  };
};

Dashboard.propTypes = {
  classes: PropTypes.object,
  userPosts: PropTypes.array,
  filteredMyFriends: PropTypes.array
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Dashboard))
);
