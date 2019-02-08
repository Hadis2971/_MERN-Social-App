import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
class Logout extends Component {
    
    componentDidMount(){
        this.props.logout();
    }

    render(){
        return(
            <Redirect to="/login" />
        );
    }
}

const MapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, MapDispatchToProps)(Logout);