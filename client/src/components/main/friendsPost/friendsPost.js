import React, {Component} from "react";
import { connect } from "react-redux";
import { addComent, getComments } from "../../../actions/friendsActions/friendsActions";
import Spinner from "../../UI/spinner/spinner";

import "./friendsPost.css";

class FriendsPost extends Component {

    state = {
        comments: [],
        post: {},
        text: ""
    }

    componentDidUpdate(){
        if(this.state.post.user && !this.state.comments.length){
            this.props.getComments(this.state.post._id);
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.comments.length !== nextProps.friendsReducer.comments.length){
            this.setState({post: nextProps.friendsReducer.friendsPost, comments: nextProps.friendsReducer.comments});
        }else if(!this.state.post.user){
            this.setState({post: nextProps.friendsReducer.friendsPost});
        }
    }

    inputChangeHandler = (evt) => {
        this.setState({text: evt.target.value});
    }

    submitCommentHandler = (evt) => {
        evt.preventDefault();
        
        this.props.addComent(this.state.text, this.props.authReducer.user.id, this.state.post._id);
    }

    addDefaultSRC = (evt) => {
        evt.target.src = "https://www.classify24.com/wp-content/uploads/2017/03/no-image.png";
    }

    render(){

        console.log(this.state);

        if(!this.state.post.user){
            return <Spinner />
        }

        let commentItems = null;
        if(this.state.comments){
            commentItems = this.state.comments.map(comment => {
                return <li className="comment-item"
                style={{width: "87%", backgroundColor: "#f2f2f2",
                padding: "2.1%", margin: "2.1% auto"}} 
                key={comment._id}>{comment.text}</li>
            })
        }

        let imgSRC = null;
        if(this.state.post.user){
            imgSRC = "http://localhost:5000/api/profile_image/" + this.state.post.user;
        }
        
        

        return(
            <div>
                <div className="card mb-3" style={{width: "70%", margin: "3% auto"}}>
                    <img src={imgSRC} 
                    className="img-fluid"  onError={this.addDefaultSRC}/>
                    <div className="card-body">
                        <h3 className="my-3">Text:</h3>
                        <p className="card-text">{this.state.post.text}</p>
                    </div>
                </div>
                <div id="comments">
                    <ul style={{listStyleType: "none"}}>{commentItems}</ul>
                </div>
                <form onSubmit={this.submitCommentHandler} style={{width: "70%", margin: "3% auto"}}>
                    <div className="form-group">
                        <input onChange={this.inputChangeHandler} value={this.state.text} type="text" className="form-control" placeholder="Your Comment..." />
                    </div>
                    <button type="submit" className="btn btn-success">Add Comment</button>
                </form>
            </div>
        );
    }
}

const MapStateToProps = state => {
    return {
        friendsReducer: state.friendsReducer,
        authReducer: state.authReducer
    }
}

const MapDispatchToProps = dispatch => {
    return {
        addComent: (text, userID, postID) => dispatch(addComent(text, userID, postID)),
        getComments: (postID) => dispatch(getComments(postID))
    }
}


export default connect(MapStateToProps, MapDispatchToProps)(FriendsPost);