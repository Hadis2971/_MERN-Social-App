import { ADD_POST_SUCCESS, GET_POSTS_SUCCESS } from "../../actions/actionTypes";
const initialState = {
    posts: []
}


const mainReducer = (state = initialState, action) => {
    switch(action.type){
        case(ADD_POST_SUCCESS):
        
        let helpArr = [...state.posts];
        helpArr.push(action.post);
        return state = {
            posts: [...helpArr]
        };
        case(GET_POSTS_SUCCESS):
        console.log(state);
        return state = {
            posts: action.posts
        };
        default:
        return state;
    }
}

export default mainReducer;