import { combineReducers } from 'redux';
import userReducer from './userReducer';
import stepReducer from './stepReducer';

const rootReducer = combineReducers({
    userDetails: userReducer,
    currentStep: stepReducer,
});

export default rootReducer;
