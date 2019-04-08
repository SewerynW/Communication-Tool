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
import SimpleTabs from '../Header/SimpleTabs';
import userApi from "../../http/dataBase/user";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/postActions";

library.add(faTrash, faEdit, faExclamationTriangle, faWindowClose);

class App extends Component {
  state = {
    posts: [],
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
    await this.setUser()
    this.setState(() => {
      return {
        logged: true
      }
    })
    
  }

  setUser = async () => {
    const user = await userApi.getInfoAboutUser();
    this.setState(() => {
      return {
        person: {
          name: user.GivenName,
          surname: user.Name
        }
      };
    }, this.props.fetchPosts());
  };

  render() {
    return (
      <div className={style.App}>
        <BrowserRouter>
          {/* <Header handleOnClick={this.logoutAndClearSession} logged={this.state.logged} /> */}
          <SimpleTabs
            handleOnClick={this.logoutAndClearSession}
            logged={this.state.logged}
            person={this.state.person}
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
            person={this.state.person}
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
  }
});

export default connect(
  null,
  mapDispatchToProps
)(App);
