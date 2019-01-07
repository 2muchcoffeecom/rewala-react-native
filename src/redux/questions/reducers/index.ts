import { unionBy } from 'lodash-es';
import * as fromActions from '../AC';
import { initialState, QuestionsState } from '../states';
import { QuestionModel } from '../../../shared/models/question.model';

export function reducer(state = initialState, action: fromActions.Actions): QuestionsState {

  switch (action.type) {
    case fromActions.ActionTypes.SET_QUESTIONS_DATA: {
      const questionsFromAction = action.payload.data.map<QuestionModel>((question) => new QuestionModel(question));

      const entities = unionBy(state.entities, questionsFromAction, '_id');
      const newEntities = entities.map<QuestionModel>((entity) => {
        const newQuestion = questionsFromAction.find(userFromAction => userFromAction._id === entity._id);

        return newQuestion ? Object.assign({}, entity, newQuestion) : entity;
      });

      return {
        ...state,
        entities: newEntities,
      };
    }

    default:
      return state;
  }
}