import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './Buttonspanel.module.scss';
import DeleteProfilePopUp from '../DeleteProfilePopUp/DeleteProfilePopUp';

export default class Buttonspanel extends React.Component {
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
  render() {
    const { activePopup } = this.state;

    return (
    <>
      <div className={styles.Buttonspanel}>
        <Button variant="contained" className={styles.EditButton}>Edit profile</Button>
        <Button variant="contained" className={styles.DeleteButton} onClick={this.handleTogglePopup}>Delete profile</Button>
      </div>
      {activePopup ? (
        <DeleteProfilePopUp
          onClose={this.handleTogglePopup}
          open={activePopup}
          logoutAndClearSession={this.props.logoutAndClearSession}
          logged={this.props.logged}
          offBlur={this.handleTogglePopup}
        />
      ) : null}

    </>
    );
  }
}


