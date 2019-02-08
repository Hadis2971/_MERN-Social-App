import { AUTH_SUCCESS, AUTH_REGISTER_SUCCESS, GET_ERRORS, AUTH_LOGOUT } 
from "../../actions/actionTypes";
import axios from "axios";
import { setAuthToken } from "../../helpers/setAuthToken";

import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => dispatch => {
    axios.post("http://localhost:5000/auth/register", userData)
      .then(response => {
        if(response.data.errors){
          dispatch({
            type: GET_ERRORS,
            errors: response.data.errors
          });
        }else {
          dispatch({
            type: AUTH_REGISTER_SUCCESS
          });
          history.push("/login");
        }
        
      })
      .catch(error => {
        
        console.log(error);
      });
}

export const checkOutUser = expires => dispatch => {
  setTimeout(() => {
    dispatch({
      type: AUTH_LOGOUT
    })
    window.location.href = "/login";
  }, expires * 1000);
  
}

export const loginUser = (userData, history) => dispatch => {
  axios.post("http://localhost:5000/auth/login", userData)
  .then(response => {
    if(response.data.errors || response.data.Client_Error){
      dispatch({
        type: GET_ERRORS,
        errors: response.data.errors || response.data.Client_Error
      });
    }else {
      localStorage.setItem("jwt_token", response.data.token);
      localStorage.setItem("expirationDate", response.data.expires * 1000);
      
      localStorage.setItem("user", JSON.stringify(jwt_decode(response.data.token)));
      setAuthToken(response.data.token);
      dispatch({
        type: AUTH_SUCCESS,
        token: response.data.token,
        user: jwt_decode(response.data.token)
      });
      dispatch(checkOutUser(response.data.expires));
      history.push("/");
    }
  })
  .catch(error => {
    console.log(error);
  });
}


export const logout = () => dispatch => {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("user");
  setAuthToken(false);
  dispatch({
    type: AUTH_LOGOUT
  });
}


export const checkStatus = (history) => dispatch => {
  const token = localStorage.getItem("jwt_token");
  if(!token){
    dispatch(logout());
  }else {
    if(new Date(localStorage.getItem("expirationDate")) < new Date()){
      dispatch(logout());
    }else {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: AUTH_SUCCESS,
        token: localStorage.getItem("jwt_token"),
        user: user
      });
      
      const exp = (localStorage.getItem("expirationDate") - 0) / 1000;
      dispatch(checkOutUser(exp));
      history.push("/");
    }
  }
}