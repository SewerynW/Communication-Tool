import React from "react";
import { Maincontent } from "./Maincontent/Maincontent";
import ButtonsPanel from "./ButtonsPanel/ButtonsPanel";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AvatarPhoto from "../../assets/profile.png";

class ProfilePage extends React.Component {
  render() {
    const { Photo, GivenName, Name } = this.props.userProfile;
    return (
      <React.Fragment>
        <Maincontent
          profilePhoto={Photo !== (null || undefined) ? Photo : AvatarPhoto}
          profileInfoName={Name}
          profileInfoSurname={GivenName}
        />
        <ButtonsPanel
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
