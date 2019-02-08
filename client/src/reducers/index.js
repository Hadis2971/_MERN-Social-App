import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorReducer";
import registerReducer from "./registerReducer";
import mainReducer from "./mainReducer/mainReducer";
import friendsReducer from "./friendsReducer/friendsReducer";

const rootReducer = combineReducers({
    authReducer,
    errorsReducer,
    registerReducer,
    mainReducer,
    friendsReducer
})

export default rootReducer;