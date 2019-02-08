import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePost } from "../../../actions/mainActions/mainActions";
import "./modal.css";

class Modal extends Component {
    state = {
        text: ""
    }

    inputChangeHandler = (evt) => {
        this.setState({text: evt.target.value});
    }

    submitFormHandler = (evt) => {
        evt.preventDefault();
        this.props.updatePost(this.props.postID, this.props.authReducer.user.id, this.state.text);
        this.props.hideModalHandler();
    }

    render(){
        return(
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span onClick={this.props.hideModalHandler} className="close">&times;</span>
                        <h2 style={{color: "#FFF", textAlign: "left"}}>Change Post</h2>
                    </div>
                    <form onSubmit={this.submitFormHandler} className="my-3" style={{width: "80%", margin: "auto"}}>
                        <div className="form-group">
                            <input className="form-control" onChange={this.inputChangeHandler} value={this.state.text} type="text" name="text" placeholder="New Text..." />
                        </div>
                        <button type="submit" className="btn btn-block btn-primary">Submit</button>
                    </form>
                    <div className="modal-footer">
                        <h3 style={{color: "#FFF", textAlign: "left"}}>Avanturisto App</h3>
                    </div>
                </div>
            </div>
        );
    }
}

const MapStateToProps = state => {
    return {
        authReducer: state.authReducer
    }
}

const MapDipatchToProps = dispatch => {
    return {
        updatePost: (postID, userID, text) => dispatch(updatePost(postID, userID, text))
    }
} 

export default connect(MapStateToProps, MapDipatchToProps)(Modal);