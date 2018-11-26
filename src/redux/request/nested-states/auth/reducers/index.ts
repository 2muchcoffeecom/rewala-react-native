import { combineReducers } from 'redux';
import { reducer as loginReducer } from '../nested-states/login/reducers';
import { reducer as registrationReducer } from '../nested-states/registration/reducers';

export const authReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
});