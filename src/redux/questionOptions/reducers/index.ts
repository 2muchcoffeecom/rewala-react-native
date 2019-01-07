import { unionBy } from 'lodash-es';
import * as fromActions from '../AC';
import { initialState, QuestionOptionsState } from '../states';
import { QuestionOptionModel } from '../../../shared/models/questionOption.model';

export function reducer(state = initialState, action: fromActions.Actions): QuestionOptionsState {

  switch (action.type) {
    case fromActions.ActionTypes.SET_QUESTION_OPTIONS_DATA: {
      const questionOptionsFromAction = action.payload.data
        .map<QuestionOptionModel[]>((question) => question.questionOptions)
        .reduce((acc, questionOptions) => acc.concat(questionOptions), []);

      const entities = unionBy(state.entities, questionOptionsFromAction, '_id');
      const newEntities = entities.map<QuestionOptionModel>((entity) => {
        const newQuestionOption = questionOptionsFromAction
          .find(questionOptionFromAction => questionOptionFromAction._id === entity._id);

        return newQuestionOption ? Object.assign({}, entity, newQuestionOption) : entity;
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