import React from "react";
import style from "./Friend.module.scss";
import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from "@material-ui/core/styles";

// Redux
import { connect } from "react-redux";
import { deleteFriend, updateFriendStatus } from "../../../actions/friendsActions";
import { fetchPosts } from "../../../actions/postActions";


const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class Friend extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     show: this.props.show,
  //     friendId: this.props.id
  //   }
  // }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.show !== this.props.show) {
  //     this.setState({
  //       show: !this.state.show
  //      });
  //   }
  // }

  onClickTrash = e => {
    e.stopPropagation();
    this.props.deleteFriend(this.props.id);
    this.props.fetchPosts();
  };
  onClickOnEye = e => {
    e.stopPropagation();
    console.log("tylko oko");
    console.log(this.props.id);
    console.log("on click show:", this.props.show);
   
    this.props.updateFriendStatus(this.props.id, this.props.show);

  }
  // onClickEye = e => {
  //   e.stopPropagation();
  //   console.log("tylko oko");
  //   console.log(this.props.show)
  // this.props.show == true;
  //return { showMe : false };
    // this.setState(() => ({ hintPopUp: false }));

    // this.props.updateFriendsStatus()
  // };


//  const handlerOnClick = async () => {
//     const friend = {
//       FriendId: id,
//       Show: show
//     };
//    await addFriend(friend);
//    await handleCloseHintPopUp();
//     addFriendsPosts(friend.FriendId);
//   };

  render() {
    const { photo, name, lastName, classes, onClickFriend, show } = this.props;
    return (
      <div className={style.container} onClick={onClickFriend}>
        <Avatar alt="Avatar" src={photo} />
        <p> {`${name} ${lastName}`}</p>
        <div className={style.icons}>
          <FontAwesomeIcon
            icon={show ? "eye" : "eye-slash"}
            size="sm"
            className={`${style.icon} ${classes.rightIcon}`}
            onClick={this.onClickOnEye}
          />
          <FontAwesomeIcon
            icon="trash"
            size="sm"
            className={`${style.icon} ${classes.rightIcon}`}
            onClick={this.onClickTrash}
          />
        </div>
      </div>
    );
  }
}

Friend.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  lastName: PropTypes.string,
  photo: PropTypes.string,
  onClick: PropTypes.func,
  show: PropTypes.bool,
  onClickFriend: PropTypes.func,
  onClickEye: PropTypes.func,
  onClickTrash: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFriend: friendId => {
      dispatch(deleteFriend(friendId));
    }, 
    fetchPosts: () => {
      dispatch(fetchPosts());
    },
    updateFriendStatus: (id,show) =>{
      dispatch(updateFriendStatus(id, show));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Friend));


