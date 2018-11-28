import { combineReducers } from 'redux';
import { reducer as loginReducer } from '../nested-states/login/reducers';
import { reducer as registrationReducer } from '../nested-states/registration/reducers';
import { reducer as resetPasswordReducer } from '../nested-states/resetPassword/reducers';
import { reducer as resetPasswordCodeReducer } from '../nested-states/resetPasswordCode/reducers';
import { reducer as newPasswordReducer } from '../nested-states/newPassword/reducers';

export const authReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  resetPassword: resetPasswordReducer,
  resetPasswordCode: resetPasswordCodeReducer,
  newPassword: newPasswordReducer,
});