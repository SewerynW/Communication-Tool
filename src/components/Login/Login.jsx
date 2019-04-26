import React from "react";
import style from "./Login.module.scss";
import GoogleLogin from "react-google-login";
import clientId from "../../secret/clientId";
import { withRouter } from "react-router-dom";
import googleLogo from "../../assets/googleLogo.svg";
import googleApi from "../../http/google/user";

class Login extends React.Component {
  redirectAndSetSession = data => {
    this.props.setSession(data);
    this.props.history.push(this.props.path);
  };

  googleResponseAfterLogin = async response => {
    const user = await googleApi.getAuthenticationToken(response.tokenId);
    this.redirectAndSetSession(user.authenticationToken);
  };

  render() {
    return (
      <React.Fragment>
        <div className={style.container}>
          <div className={style.login}>
            <div className={style.text}>
              <h1>Hello stranger</h1>
              <p>
                To go any further please log in <br /> You can do this really
                fast using Google
              </p>
            </div>

            <GoogleLogin
              clientId={clientId}
              render={renderProps => (
                <form
                  className={style.googleButton}
                  onClick={renderProps.onClick}
                >
                  <img src={googleLogo} alt="Google Logo" />
                </form>
              )}
              buttonText="Login"
              onSuccess={this.googleResponseAfterLogin}
              onFailure={this.googleResponseAfterLogin}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(Login);
