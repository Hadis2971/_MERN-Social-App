import { AUTH_SUCCESS, AUTH_LOGOUT } from "../../actions/actionTypes";

const initialState = {
    user: null,
    errors: null,
    token: null,
    loading: false,
    isAuthenticated: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case(AUTH_SUCCESS):
        return state = {
            loading: false,
            token: action.token,
            user: action.user,
            isAuthenticated: (action.token)? true : false,
            errors: null
        };
        case(AUTH_LOGOUT):
        return state = {
            loading: false,
            token: null,
            user: null,
            isAuthenticated: false,
            errors: null
        }        
        default:
        return state
    }
}

export default authReducer;