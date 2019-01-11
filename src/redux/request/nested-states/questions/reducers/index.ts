import { combineReducers } from 'redux';
import { reducer as createQuestionReducer } from '../nested-states/createQuestion/reducers';
import { reducer as pagedFeedReducer } from '../nested-states/pagedFeed/reducers';
import { reducer as pagedMeReducer } from '../nested-states/pagedMe/reducers';
import { reducer as pagedOfUserReducer } from '../nested-states/pagedOfUser/reducers';

export const questionsReducer = combineReducers({
  createQuestion: createQuestionReducer,
  pagedFeed: pagedFeedReducer,
  pagedMe: pagedMeReducer,
  pagedOfUser: pagedOfUserReducer,
});