import { ADD_COMMENT_SUCCESS, GET_COMMENTS_SUCCESS, GET_FRIENDS_POSTS_SUCCESS, SEARCH_FRIENDS_SUCCESS, ADD_FRIEND_SUCCESS, GET_FRIENDS_POST_SUCCESS } from "../actionTypes";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = localStorage.getItem("jwt_token");
export const getFriendsPosts = userID => dispatch => {
  axios.get("http://localhost:5000/friends/friendsPosts/" + userID)
  .then(response => {
    console.log(response);
    dispatch({
        type: GET_FRIENDS_POSTS_SUCCESS,
        posts: response.data || []
    });
  })
  .catch(error => {
    console.log(error);
  });
}

export const getFriendsPost = (postID, history) => dispatch => {
  axios.get("http://localhost:5000/friends/friednsPost/" + postID)
  .then(response => {
    history.push("/friendsPost");
    dispatch({
        type: GET_FRIENDS_POST_SUCCESS,
        post: response.data
    });
    
  })
  .catch(error => {
    console.log(error);
  });
}

export const searchForFriends = name => dispatch => {
    axios.get("http://localhost:5000/friends/search/" + name)
      .then(response => {
        dispatch({
            type: SEARCH_FRIENDS_SUCCESS,
            friends: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
}

export const addFriend = (userID, friendID) => dispatch => {
  axios.post("http://localhost:5000/friends/addFriend", {
    userID,
    friendID
  })
  .then(response => {
    dispatch({
      type: ADD_FRIEND_SUCCESS,
      friend: response.data
    });
  })
  .catch(error => {
    console.log(error);
  });
}

export const getComments = postID => dispatch => {
  axios.get("http://localhost:5000/friends/getComments/" + postID)
      .then(response => {
        dispatch({
          type: GET_COMMENTS_SUCCESS,
          comments: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
}

export const addComent = (text, userID, postID) => dispatch => {
  axios.post("http://localhost:5000/friends/addComment", {
    text,
    userID,
    postID
  })
  .then(response => {
    console.log(response);
    dispatch({
      type: ADD_COMMENT_SUCCESS,
      comment: response.data
    })
  })
  .catch(error => {
    console.log(error);
  });
}