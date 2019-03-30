import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import PostModal from '../PostModal/PostModal'
import FontAwesomeButton from '../FontAwesomeButton/FontAwesomeButton'
import { Header } from '../Header/Header.jsx';
import { Footer } from '../Footer/Footer.jsx';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePopup: false
    }
  }

  handleTogglePopup = () => {
    if (!this.state.activePopup) {
      document.getElementById("root").style.filter = "blur(2px)";
    } else {
      document.getElementById("root").style.filter = "blur(0)";
    }
    this.setState(prevState => ({
      activePopup: !prevState.activePopup
    }));

  }

  openProfilePage = () => {

  }

  render() {
    return (
      <React.Fragment>


        <p> Zalogowany</p>
        <FontAwesomeButton />
        <button onClick={this.handleTogglePopup}>Click me</button>
        {this.state.activePopup ? (
          <PostModal
            onClose={this.handleTogglePopup}
            open={this.state.activePopup}
            postTitle="Title of post!"
            postContent2="word"
            postContent="in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a cras semper auctor neque vitae tempus quam pellentesque nec nam aliquam sem et tortor consequat id porta nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae"
            postImage="https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            postPublishDate="2019-03-20T06:56:48.7005913Z"
          />
        ) : null}
      </React.Fragment>
    );
  }
}

