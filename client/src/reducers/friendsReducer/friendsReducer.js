import { ADD_COMMENT_SUCCESS, GET_COMMENTS_SUCCESS, SEARCH_FRIENDS_SUCCESS, ADD_FRIEND_SUCCESS, GET_FRIENDS_POSTS_SUCCESS, GET_FRIENDS_POST_SUCCESS } from "../../actions/actionTypes";;

const initialState = {
    friends: [],
    friednsPosts: [],
    friendsPost: {},
    comments: []
}



const friendsReducer = (state = initialState, action) => {
    switch(action.type){
        case(SEARCH_FRIENDS_SUCCESS):
        return state = {
            ...state,
            friends: action.friends
        };
        case(ADD_FRIEND_SUCCESS):
        let helpArr = [...state.friends];
        helpArr.push(action.friend);
        return state = {
            ...state,
            friends: [...helpArr]
        };
        case(GET_FRIENDS_POSTS_SUCCESS):
        return state = {
            ...state,
            friednsPosts: action.posts
        };
        case(GET_FRIENDS_POST_SUCCESS):
        return state = {
            ...state,
            friendsPost: action.post
        };
        case(GET_COMMENTS_SUCCESS):
        return state = {
            ...state,
            comments: [...action.comments]
        };
        case(ADD_COMMENT_SUCCESS):
        let helpArr2 = [...state.comments];
        helpArr2.push(action.comment);
        return state = {
            ...state,
            comments: [...helpArr2]
        };
        default:
        return state
    }
}



export default friendsReducer;