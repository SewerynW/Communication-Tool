import React from "react";
import { Maincontent } from "../Maincontent/Maincontent.jsx";
import Buttonspanel from "../Buttonspanel/Buttonspanel.jsx";
import AvatarPhoto from "../../assets/janedoe.jpg";
import { connect } from "react-redux";
import Axios from "../../http/dataBase/user";

class ProfilePage extends React.Component {
  state = {
    person: {
      name: "",
      surname: ""
    },
    image: AvatarPhoto,
    user: {
      Name: "Seweryn",
      GivenName: "Wadowski"
    }
  };

  editProfile = () => {
    const formData = new FormData();
    formData.append("user", JSON.stringify(this.state.user));
    Axios.updateUserProfile(formData);
  };
  render() {
    const { Photo, GivenName, Name } = this.props.userProfile;
    console.log(this.props);
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
        <button onClick={this.editProfile}>update</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userProfile: state.profileReducer
});
export default connect(
  mapStateToProps,
  null
)(ProfilePage);
