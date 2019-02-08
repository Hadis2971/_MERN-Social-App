import React, {Component} from "react";
import { connect } from "react-redux";
import { searchForFriends, getFriendsPosts, getFriendsPost } from "../../../actions/friendsActions/friendsActions";
import Spinner from "../../UI/spinner/spinner";
import "./friendsPosts.css";

class FriendsPosts extends Component {


    state = {
        text: "",
        posts: []
    }

    

    componentDidMount(){
        const user = JSON.parse(localStorage.getItem("user"));
        const id = (this.props.authReducer.user)? 
        this.props.authReducer.user.id: user.id;
        this.props.getFriendsPosts(id);
    }

    componentWillReceiveProps(nextProps){
        
        if(!this.state.posts.length){
            this.setState({posts: nextProps.friendsReducer.friednsPosts});
        }else if(this.state.posts.length !== nextProps.friendsReducer.friednsPosts.length){
            this.setState({posts: nextProps.friendsReducer.friednsPosts});
        }
        
    }

    inputChangeHandler = (evt) => {
        this.setState({text: evt.target.value});
    }

    searchFormHandler = (evt) => {
        evt.preventDefault();

        if(!this.state.text){
            alert("Plese Enter A Name...");
            return;
        }else {
            this.props.searchForFriends(this.state.text);
            this.props.history.push("/friendList");
        }
    }

    addDefaultSRC = (evt) => {
        evt.target.src = "https://www.classify24.com/wp-content/uploads/2017/03/no-image.png";
    }
    

    render(){


        if(!this.state.posts.length){
            return <Spinner />
        }

        let friendsPostsList = this.state.posts.map(post => {
            return <li className="post-item" style={{cursor: "pointer"}} 
                    onClick={() => this.props.getFriendsPost(post._id, this.props.history)} 
                    key={post._id}>
                    <img onError={this.addDefaultSRC} className="img-fluid" 
                    src={"http://localhost:5000/api/profile_image/" + post.userID} />
                    <hr />
                    <h3 className="my-3">Friend : {post.name}</h3>
                    <p style={{fontSize: "1.3em"}}>{post.text}</p></li>
        })

        return(
            <div id="friends-box">
                <div id="friends-posts-box">
                <h1 className="text-center display-3" style={{color: "#0059b3"}}>
                What Your Friends Do...</h1>
                    <div id="posts">
                        <ul style={{listStyleType: "none"}}>{friendsPostsList}</ul>
                    </div>
                </div>
                <div id="add-friends-box">
                    <form onSubmit={this.searchFormHandler}>
                        <div className="form-group">
                            <input value={this.state.text} 
                            onChange={this.inputChangeHandler}
                            className="form-control" type="text" 
                            name="friend" placeholder="Search For Friends" />
                        </div>
                        <button type="submit" className="btn btn-block btn-success">Search</button>
                    </form>
                </div>
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
        searchForFriends: (name) => dispatch(searchForFriends(name)),
        getFriendsPosts: (userID) => dispatch(getFriendsPosts(userID)),
        getFriendsPost: (postID, history) => dispatch(getFriendsPost(postID, history))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(FriendsPosts);