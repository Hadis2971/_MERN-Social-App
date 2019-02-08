import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost, getPosts, deletePost } from "../../../actions/mainActions/mainActions";
import { withRouter } from "react-router-dom";
import Modal from "../../UI/modal/modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import "./addPost.css";

class AddPost extends Component {

    state = {
        text: "",
        postID: "",
        posts: [],
        showModal: false
    }

    componentDidMount(){
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        this.props.getPosts(user.id);
    }

    componentWillReceiveProps(nextProps){
        this.setState({posts: [...nextProps.mainReducer.posts]});
    }

    inputChangeHandler = (evt) => {
        this.setState({text: evt.target.value});
    }

    submitFormHandler = (evt) => {
        evt.preventDefault();

        this.props.addPost(this.state.text, this.props.authReducer.user.id);
    }

    showModalHandler = (id) => {
        this.setState({showModal: true, postID: id});
    }

    hideModalHandler = () => {
        this.setState({showModal: false});
    }

    
    
    render(){

        const element = <FontAwesomeIcon icon={faTrashAlt} />
        const element2 = <FontAwesomeIcon icon={faPencilAlt} />

        let posts = this.state.posts.map(post => {
            let id = post.hasOwnProperty("_id")? post._id : post.id;
            return <li className="list-item" key={id}>
            {post.text}
            <span onClick={() => this.props.deletePost(id, this.props.authReducer.user.id)} className="delete">{element}</span>
            <span onClick={() => this.showModalHandler(id)} className="update">{element2}</span>
            </li>
        })

        let modal = null;

        if(this.state.showModal){
            modal = <Modal hideModalHandler={this.hideModalHandler} postID={this.state.postID}/>
        }

        console.log(this.state);
        return(
            <div>
                {modal}
                <div id="add-post-box">
            
                <div id="posts">
                    {posts}
                </div>
                <form id="add-post-form" onSubmit={this.submitFormHandler}>
                    <div className="form-group" id="add-post">
                        <input 
                        onChange={this.inputChangeHandler} 
                        id="newPost" className="form-control" 
                        type="text" name="newPost" placeholder="New Post..." />
                    </div>
                    <button id="btn" type="submit" className="btn btn-primary">Add Post</button>
                </form>
            </div>
            </div>
        );
    }
}

const MapStateToProps = state => {
    return {
        authReducer: state.authReducer,
        mainReducer: state.mainReducer
    }
}

const MapDipatchToProps = dispatch => {
    return {
        addPost: (text, id) => dispatch(addPost(text, id)),
        getPosts: (id) => dispatch(getPosts(id)),
        deletePost: (postID, userID) => dispatch(deletePost(postID, userID))
    }
} 

export default withRouter(connect(MapStateToProps, MapDipatchToProps)(AddPost));