import { combineReducers } from 'redux';
import { reducer as createQuestionReducer } from '../nested-states/createQuestion/reducers';

export const questionsReducer = combineReducers({
  createQuestion: createQuestionReducer,
});