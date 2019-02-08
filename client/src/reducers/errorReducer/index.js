import { GET_ERRORS } from "../../actions/actionTypes";
const initialState = {
    errors: null
}

const errorsReducer = (state = initialState, action) => {
    if(action.type === GET_ERRORS){
        return state = {
            errors: action.errors
        }
    }else {
        return state;
    }
}

export default errorsReducer;