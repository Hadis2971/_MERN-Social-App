import { AUTH_REGISTER_SUCCESS } from "../../actions/actionTypes";

const initialState = {
    registration_success: false
}

const registerReducer = (state = initialState, action) => {
    switch(action.type){
        case(AUTH_REGISTER_SUCCESS):
        return state = {
            registration_success: true
        };
        default:
        return state;
    }
}

export default registerReducer;