import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

class Dashboard extends Component {
    render(){
        if(this.props.authReducer.isAuthenticated || localStorage.getItem("jwt_token")){
            return(
                <div>
                    <div className="jumbotron">
                        <h1 className="display-1" style={{color: "#0059b3"}}>Welcome To Aventuristo</h1>
                    </div>
                    <div style={{textAlign: "center", marginTop: "5%"}}>
                        <Link to="/addPost" style={{border: "0.05em solid #0059b3", fontSize: "1.3em", padding: "3%", marginRight: "3%", cursor: "pointer"}}>Add Post</Link>
                        <Link to="/friendsPosts" style={{border: "0.05em solid #0059b3", fontSize: "1.3em", padding: "3%", cursor: "pointer"}}>New Posts</Link>
                    </div>
                </div>
                
            );
        }else {
            return <Redirect to="/login" />
        }

        
    }
}

const MapStateToProps = state => {
    return {
        authReducer: state.authReducer
    }
}

export default connect(MapStateToProps, null)(Dashboard);