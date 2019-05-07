import React from "react";
import Card from "@material-ui/core/Card";
import style from "./ListOfHints.module.scss";
import PostHint from "./PostHint/PostHint";
import FriendHint from "./FriendHint/FriendHint";

class ListOfHints extends React.Component {
  componentDidMount() {
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

  renderPeople = data => {
    return data.map(friend => (
      <FriendHint
        key={friend.Id}
        photo={friend.Photo}
        name={friend.Name}
        lastName={friend.GivenName}
      />
    ));
  };

  renderHints = (dataType, data) => {
    switch (dataType) {
      case "people":
        return this.renderPeople(data);
      case "post":
        return this.renderPosts(data);
      default:
        break;
    }
  };

  render() {
    const { filteredData, dataType, additionalStyle } = this.props;

    return (
      <div ref={this.setWrapperRef}>
        <Card className={style.container} style={additionalStyle}>
          {this.renderHints(dataType, filteredData)}
        </Card>
      </div>
    );
  }
}

export default ListOfHints;
