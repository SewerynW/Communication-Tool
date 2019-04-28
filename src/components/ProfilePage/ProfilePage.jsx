import React from "react";
import { Maincontent } from "../Maincontent/Maincontent.jsx";
import Buttonspanel from "../Buttonspanel/Buttonspanel.jsx";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ProfilePage extends React.Component {
  render() {
    const { Photo, GivenName, Name } = this.props.userProfile;
    return (
      <React.Fragment>
        <Maincontent
          profilePhoto={Photo}
          profileInfoName={Name}
          profileInfoSurname={GivenName}
        />
        <Buttonspanel
          logoutAndClearSession={this.props.logoutAndClearSession}  logged={this.props.logged}
        />
        <button onClick={this.editProfile}>update</button>
      </React.Fragment>
    );
  }
}

ProfilePage.propTypes = {
  userProfile: PropTypes.object,
  logoutAndClearSession: PropTypes.func
};

const mapStateToProps = state => ({
  userProfile: state.profileReducer
});
export default connect(
  mapStateToProps,
  null
)(ProfilePage);
