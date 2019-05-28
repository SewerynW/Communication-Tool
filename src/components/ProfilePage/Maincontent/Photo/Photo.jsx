import React from "react";
import Avatar from "@material-ui/core/Avatar";

const styles = {
  Image: {
    margin: "auto",
    marginTop: 20,
    display: "block",
    width: 250,
    height: 250
  }
};

export class Photo extends React.Component {
  render() {
    return (
      <Avatar
        alt="User avatar photo"
        src={this.props.profilePhoto}
        style={styles.Image}
      />
    );
  }
}
