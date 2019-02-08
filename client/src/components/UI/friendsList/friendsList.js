import React, { Component } from "react";
import { connect } from "react-redux";
import { addFriend } from "../../../actions/friendsActions/friendsActions";

class FriendsList extends Component {

    state = {
        friends: []
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.friendsReducer.friends);
        this.setState({friends: nextProps.friendsReducer.friends});
        
    }

    addFriendHandler = (userID, friendID) => {
        this.props.addFriend(userID, friendID);
        this.props.history.push("/");
    }

    addDefaultSRC = (evt) => {
        evt.target.src = "https://www.classify24.com/wp-content/uploads/2017/03/no-image.png";
    }

    render(){

        let friends = this.state.friends.map(friend => {
            return <li key={friend._id} style={{margin: "2.3%"}}>
                    <div className="card" style={{width: "18rem"}}>
                    <img onError={this.addDefaultSRC} 
                    src={"http://localhost:5000/api/profile_image/" + friend._id} 
                    className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{friend.name}</h5>
                    </div>
                    
                     <button onClick={() => this.addFriendHandler(this.props.authReducer.user.id, friend._id)} 
                     style={{margin: "1%"}} 
                     className="mt-3 btn btn-primary">
                     Add Friend</button>
                    
                    </div>
                    </li>
        })

        return(
            <ul style={{listStyleType: "none"}}>
                {friends}
            </ul>
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
        addFriend: (userID, friendID) => dispatch(addFriend(userID, friendID))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(FriendsList);