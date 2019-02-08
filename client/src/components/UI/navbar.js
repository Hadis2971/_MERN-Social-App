import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Navbar extends Component {

    

    render(){

        let loginLogout = null;
        if(this.props.authReducer.isAuthenticated){
            loginLogout = <Link to="/logout" className="nav-link" style={{color: "#FFF"}}>Logout</Link>
        }else {
            loginLogout = <Link className="nav-link" to="/login" style={{color: "#FFF"}}>Login</Link>
        }

        return(
            <nav className="navbar navbar-light navbar-expand-lg" style={{backgroundColor: "#0059b3"}}>
                 <button className="navbar-toggler" type="button" 
                 data-toggle="collapse" data-target="#collapseDiv" 
                 aria-controls="navbarSupportedContent" 
                 aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" style={{color: "#FFF"}}></span>
                </button>

                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            {this.props.authReducer.isAuthenticated? <Link className="nav-link" to="/" style={{color: "#FFF"}}>Home <span className="sr-only">(current)</span></Link>
                            : null}
                        </li>
                        <li className="nav-item">
                        {!this.props.authReducer.isAuthenticated?<Link className="nav-link" to="/register" style={{color: "#FFF"}}>Register</Link>
                        : null}
                        </li>
                        <li className="nav-item">
                            {loginLogout}
                        </li>
                    </ul>
                </div>    
            </nav>
        );
    }
}

const MapStateToProps = state => {
    return {
        authReducer: state.authReducer
    }
}

export default connect(MapStateToProps, null)(Navbar);