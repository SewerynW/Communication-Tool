import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import style from "./App.module.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faTrash,
  faExclamationTriangle,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import PrivateRoute from "../PrivateRoute";
import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import ProfilePage from "../ProfilePage/ProfilePage";
import Footer from "../Footer/Footer";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/postActions";
import { fetchProfile } from "../../actions/profileActions";
import PostForm from "../PostForm/PostForm";

library.add(faTrash, faEdit, faExclamationTriangle, faWindowClose);

class App extends Component {
  state = {
    logged: false,
    person: {
      name: "",
      surname: ""
    }
  };

  logoutAndClearSession = () => {
    this.setState(() => {
      return { logged: false };
    });
    sessionStorage.clear();
  };

  setSession = async data => {
    sessionStorage.setItem("userId", data);
    await this.setUser();
    this.setState(() => {
      return {
        logged: true
      };
    });
  };

  setUser = async () => {
    await this.props.fetchPosts();
    await this.props.fetchProfile();
  };

  render() {
    return (
      <div className={style.App}>
        <BrowserRouter>
          <Header
            logoutAndClearSession={this.logoutAndClearSession}
            logged={this.state.logged}
          />
          <PrivateRoute
            exact
            path="/"
            component={Dashboard}
            setSession={this.setSession}
            logged={this.state.logged}
          />
          <PrivateRoute
            path="/dashboard"
            component={Dashboard}
            setSession={this.setSession}
            logged={this.state.logged}
          />
          <PrivateRoute
            path="/profilePage"
            component={ProfilePage}
            setSession={this.setSession}
            logged={this.state.logged}
            logoutAndClearSession={this.logoutAndClearSession}
          />
          <PrivateRoute
            path="/newPost"
            component={PostForm}
            setSession={this.setSession}
            logged={this.state.logged}
          />
          <PrivateRoute
            path="/editPost"
            component={PostForm}
            setSession={this.setSession}
            logged={this.state.logged}
          />
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => {
    dispatch(fetchPosts());
  },
  fetchProfile: () => {
    dispatch(fetchProfile());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(App);
