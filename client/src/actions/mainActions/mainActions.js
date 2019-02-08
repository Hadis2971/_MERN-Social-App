import { ADD_POST_SUCCESS, GET_POSTS_SUCCESS } from "../actionTypes";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = localStorage.getItem("jwt_token");
export const addPost = (text, id) => dispatch => {
    axios.post("http://localhost:5000/main/newPost/" + id, {
        text: text
      })
      .then(response =>{
        console.log(response);
        dispatch({
            type: ADD_POST_SUCCESS,
            post: response.data.responsePost
        });
      })
      .catch(error => {
        console.log(error);
      });
}

export const getPosts = (userID) => dispatch => {
  axios.get("http://localhost:5000/main/newPost/" + userID)
  .then(response => {
    console.log(response);
    dispatch({
      type: GET_POSTS_SUCCESS,
      posts: response.data
    });
  })
  .catch(error => {
    console.log(error);
  });
}

export const deletePost = (postID, userID) => dispatch => {
  axios.delete("http://localhost:5000/main/newPost/" + userID + "/" + postID)
  .then(response => {
    console.log(response);
    dispatch({
      type: GET_POSTS_SUCCESS,
      posts: response.data
    });
  })
  .catch(error => console.log(error));
}

export const updatePost = (postID, userID, text) => dispatch => {
  axios.put("http://localhost:5000/main/newPost/" + postID + "/" + userID, {
    text: text
  })
  .then(response => {
    console.log(response);
    dispatch({
      type: GET_POSTS_SUCCESS,
      posts: response.data
    });
  })
  .catch(error => {
    console.log(error);
  });
}