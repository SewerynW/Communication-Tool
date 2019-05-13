import React from "react";
import Card from "@material-ui/core/Card";
import style from "./ListOfHints.module.scss";
import PostHint from "./PostHint/PostHint";
import FriendHint from "./FriendHint/FriendHint";

class ListOfHints extends React.Component {
  component() {
    document.addEventListener("mousedown", this.handleClickOutSide);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutSide);
  }

  handleClickOutSide = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.handleCloseHintPopUp();
    }
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  renderPosts = data => {
    return data.map(post => <PostHint key={post.Id} post={post} />);
  };

  renderPeople = (data, handleCloseHintPopUp) => {
    return data.map(friend => (
      <FriendHint
        key={friend.Id}
        id={friend.Id}
        photo={friend.Photo}
        name={friend.Name}
        lastName={friend.GivenName}
        show={friend.Show}
        handleCloseHintPopUp={handleCloseHintPopUp}
      />
    ));
  };

  renderHints = (dataType, data, handleCloseHintPopUp) => {
    switch (dataType) {
      case "people":
        return this.renderPeople(data, handleCloseHintPopUp);
      case "post":
        return this.renderPosts(data);
      default:
        break;
    }
  };

  render() {
    const {
      filteredData,
      dataType,
      additionalStyle,
      handleCloseHintPopUp
    } = this.props;
    return (
      <div ref={this.setWrapperRef}>
        <Card className={style.container} style={additionalStyle}>
          {this.renderHints(dataType, filteredData, handleCloseHintPopUp)}
        </Card>
      </div>
    );
  }
}

export default ListOfHints;
