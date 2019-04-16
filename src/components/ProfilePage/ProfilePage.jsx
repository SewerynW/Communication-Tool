import React from 'react';
import { Maincontent } from '../Maincontent/Maincontent.jsx';
import Buttonspanel from '../Buttonspanel/Buttonspanel.jsx';
import AvatarPhoto from '../../assets/janedoe.jpg';
import { connect } from 'react-redux';


class ProfilePage extends React.Component {
  state = {
    person: {
      name: "",
      surname: ""
    },
    image: AvatarPhoto
  }
  render() {
    const { Photo, GivenName, Name} = this.props.userProfile;
    return (
      <React.Fragment>
        <Maincontent
          profilePhoto={Photo}
          profileInfoName={Name}
          profileInfoSurname={GivenName}
        />
        <Buttonspanel  logoutAndClearSession={this.props.logoutAndClearSession} />
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state)=> ({
  userProfile: state.profileReducer
});
export default connect(mapStateToProps, null)(ProfilePage);



