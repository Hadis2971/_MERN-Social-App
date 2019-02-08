import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";


import 'react-notifications/lib/notifications.css';
import "./login.css";

class Login extends Component {

    state = {
        email: "",
        password: "",
        success: false,
        errors: null
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.errorsReducer.errors){
            this.setState({errors: nextProps.errorsReducer.errors});
        }
    }

    componentDidMount(){
        if(this.props.registerReducer.registration_success){
            this.setState({success: true});
        }
    }

    

    changeInputHandler = (evt) => {
        this.setState({[evt.target.id]: [evt.target.value]});
    };

    formSubmitHandler = (evt) => {

        evt.preventDefault();

        const email = (this.state.email[0])? this.state.email[0] : "";
        const password = (this.state.password[0])? this.state.password[0] : "";

        

        const userData = {
            email,
            password
        }

        

        this.props.loginUser(userData, this.props.history);
    }

    render(){

        let email = null;
        let password = null;
        let credentials = null;
        if(this.state.errors){
            if(this.state.errors.email){
                email = <p style={{color: "red"}}>{this.state.errors.email}</p>;
            }
            
            if(this.state.errors.password){
                password = <p style={{color: "red"}}>{this.state.errors.password}</p>;
            }
            
            if(this.state.errors === "Email Not Found!!!" || this.state.errors === "Wrong Password!!!"){
                credentials = <div className="alert alert-danger mb-3">{this.state.errors}</div>
            }
        }        
                

        return(
            
            <form id="login-form" onSubmit={this.formSubmitHandler}>
            {this.state.success && <div className="alert alert-success">You Are Now Registred And Can Login</div>}
            {credentials}
            <h1 className="text-center display-2 mb-3" style={{color: "#0059b3"}}>Sing In</h1>
                <div className="form-group">
                    <input type="email" id="email" value={this.state.email}
                    onChange={this.changeInputHandler}  
                    name="email" className="form-control" 
                    placeholder="Your Email..." />
                    {email}
                </div>
                <div className="form-group">
                    <input type="password" id="password" value={this.state.password}
                    onChange={this.changeInputHandler}  
                    name="password" className="form-control" 
                    placeholder="Your Password..." />
                    {password}
                </div>
                <button className="btn btn-block mt-3"
                type="submit" 
                style={{backgroundColor: "#0059b3", color: "#FFF"}}>
                Login</button>
            </form>
        );
    }
}

const MapStateToProps = state => {
    return {
        registerReducer: state.registerReducer,
        errorsReducer: state.errorsReducer,
        authReducer: state.authReducer
    }
}

const MapDispatchToProps = dispatch => {
    return {
        loginUser: (userData, history) => dispatch(loginUser(userData, history))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Login);