import React from "react";
import Button from "@material-ui/core/Button";
import styles from "./ButtonsPanel.module.scss";
import DeleteProfilePopUp from "../../DeleteProfilePopUp/DeleteProfilePopUp";
import { withRouter } from "react-router-dom";

class ButtonsPanel extends React.Component {
  state = {
    activePopup: false
  };

  handleTogglePopup = () => {
    if (!this.state.activePopup) {
      document.getElementById("root").style.filter = "blur(2px)";
    } else {
      document.getElementById("root").style.filter = "blur(0)";
    }
    this.setState(prevState => ({
      activePopup: !prevState.activePopup
    }));
  };

  handleOnClickEditProfile = () => {
    this.props.history.push("/editProfile");
  };

  render() {
    const { activePopup } = this.state;
    return (
      <>
        <div className={styles.ButtonsPanel}>
          <Button
            variant="contained"
            className={styles.EditButton}
            onClick={this.handleOnClickEditProfile}
          >
            Edit profile
          </Button>
          <Button
            variant="contained"
            className={styles.DeleteButton}
            onClick={this.handleTogglePopup}
          >
            Delete profile
          </Button>
        </div>
        {activePopup ? (
          <DeleteProfilePopUp
            onClose={this.handleTogglePopup}
            open={activePopup}
            logoutAndClearSession={this.props.logoutAndClearSession}
            offBlur={this.handleTogglePopup}
          />
        ) : null}
      </>
    );
  }
}

export default withRouter(ButtonsPanel);
