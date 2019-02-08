import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../../actions/authActions";

import "./register.css";

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: null
        }
        this.profileImage = React.createRef()
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errorsReducer.errors){
            this.setState({errors: nextProps.errorsReducer.errors});
        }
    }

    

    changeInputHandler = (evt) => {
        this.setState({[evt.target.id]: [evt.target.value]});
    };

    formSubmitHandler = (evt) => {
        evt.preventDefault();

        const  name   = (this.state.name[0])? this.state.name[0] : "";
        const  email  = (this.state.email[0])? this.state.email[0] : "";
        const  password   = (this.state.password[0])? this.state.password[0] : "";
        const  password2  = (this.state.password2[0])? this.state.password2[0] : "";
        const  profileImage = this.profileImage.current.files[0];

        

        let data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("password", password);
        data.append("password2", password2);
        data.append("profileImage", profileImage);
        
        

        this.props.registerUser(data, this.props.history);
    }

    render(){

        let nameError = null;
        let emailError = null;
        let passwordError = null;
        let password2Error = null;
        if(this.state.errors){
            nameError = <p style={{color: "red"}}>{this.state.errors.name}</p>
            emailError = <p style={{color: "red"}}>{this.state.errors.email}</p>
            passwordError = <p style={{color: "red"}}>{this.state.errors.password}</p>
            password2Error = <p style={{color: "red"}}>{this.state.errors.password2}</p>
        }


        return(
            <form encType="multipart/form-data" id="register-form" onSubmit={this.formSubmitHandler}>
            <h1 className="text-center display-2 mb-3" style={{color: "#0059b3"}}>Sing Up</h1>
                <div className="form-group">
                    <input type="text" id="name" value={this.state.name}
                    onChange={this.changeInputHandler} 
                    name="name" className="form-control" 
                    placeholder="Your Name..." />
                    {nameError}
                </div>
                <div className="form-group">
                    <input type="email" id="email" value={this.state.email}
                    onChange={this.changeInputHandler}  
                    name="email" className="form-control" 
                    placeholder="Your Email..." />
                    {emailError}
                </div>
                <div className="form-group">
                    <input type="password" id="password" value={this.state.password}
                    onChange={this.changeInputHandler}  
                    name="password" className="form-control" 
                    placeholder="Your Password..." />
                    {passwordError}
                </div>
                <div className="form-group">
                    <input type="password" id="password2" value={this.state.password2}
                    onChange={this.changeInputHandler}  
                    name="password2" className="form-control" 
                    placeholder="Confirm Password..." />
                    {password2Error}
                </div>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" 
                    name="profileImage" id="profileImage"
                    ref={this.profileImage}/>
                    <label className="custom-file-label" 
                    htmlFor="profileImage">
                    Choose file...</label>
                    <div className="invalid-feedback">
                    Example invalid custom file feedback</div>
                </div>
                <button className="btn btn-block mt-3"
                type="submit" 
                style={{backgroundColor: "#0059b3", color: "#FFF"}}>
                Register</button>
            </form>
        );
    }
}

const MapStateToProps = state => {
    return {
        errorsReducer: state.errorsReducer
    }
}

const MapDispatchToProps = dispatch => {
    return {
        registerUser: (userData, history) => dispatch(registerUser(userData, history))
    }
}


export default connect(MapStateToProps, MapDispatchToProps)(withRouter(Register));