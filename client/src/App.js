import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";

import { checkStatus } from "./actions/authActions";

import Navbar from "./components/UI/navbar";
import Register from "./components/auth/register/register";
import Login from "./components/auth/login/login";
import Logout from "./components/auth/logout";
import Dashboard from "./components/UI/dashboard";
import AddPost from "./components/main/addPost/addPost";
import FriendsPosts from "./components/main/friendsPosts/friendsPosts";
import FriendsList from "./components/UI/friendsList/friendsList";
import FriendsPost from "./components/main/friendsPost/friendsPost";

import './App.css';

class App extends Component {

  componentDidMount(){
    this.props.checkStatus(this.props.history);
  }

  render() {

    
    return (
        
      <div className="App">
        <Navbar />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/addPost" component={AddPost} />
        <Route exact path="/friendsPosts" component={FriendsPosts} />
        <Route exact path="/friendList" component={FriendsList} />
        <Route exact path="/friendsPost" component={FriendsPost} />
      </div>
        
    );
  }
}

const MapStateToProps = state => {
  return {
      authReducer: state.authReducer
  }
}

const MapDispatchToProps = dispatch => {
  return {
    checkStatus: (history) => dispatch(checkStatus(history))
  }
}  

export default withRouter(connect(MapStateToProps, MapDispatchToProps)(App));
