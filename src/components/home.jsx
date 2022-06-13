import React, { Component } from "react";
import MainPage from "./mainPage";
import NotLoggedIn from './notLoggedIn';

class Home extends Component {
  show = this.props.loggedIn?MainPage:NotLoggedIn;
  render() {
    return (
      <React.Fragment>
        <this.show/>
      </React.Fragment>
    );
  }
}

export default Home;
