import React from "react";
import { Maincontent } from "./Maincontent/Maincontent";
import Buttonspanel from "./Buttonspanel/Buttonspanel";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ProfilePage extends React.Component {
  render() {
    const { Photo, GivenName, Name } = this.props.userProfile;
    console.log("leci ze stora", this.props.userProfile);
    return (
      <React.Fragment>
        <Maincontent
          profilePhoto={Photo}
          profileInfoName={Name}
          profileInfoSurname={GivenName}
        />
        <Buttonspanel
          logoutAndClearSession={this.props.logoutAndClearSession}
        />
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
