import { combineReducers } from 'redux';
import { reducer as createQuestionReducer } from '../nested-states/createQuestion/reducers';
import { reducer as pagedFeedReducer } from '../nested-states/pagedFeed/reducers';
import { reducer as pagedMyReducer } from '../nested-states/pagedMy/reducers';
import { reducer as pagedOfUserReducer } from '../nested-states/pagedOfUser/reducers';

export const questionsReducer = combineReducers({
  createQuestion: createQuestionReducer,
  pagedFeed: pagedFeedReducer,
  pagedMy: pagedMyReducer,
  pagedOfUser: pagedOfUserReducer,
});