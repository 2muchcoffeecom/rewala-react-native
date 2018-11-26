import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { UserModel } from '../../../../../../../shared/models/user.model';
import { RequestError } from '../../../../../states';
import { UserInput } from '../../../../../../../shared/services/auth.service';

export enum ActionTypes {
  REGISTRATION = 'REGISTRATION',
  REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  REGISTRATION_FAIL = 'REGISTRATION_FAIL',
}

export const Actions = {
  registration: (data: UserInput) => createAction(ActionTypes.REGISTRATION, {data}),
  registrationSuccess: (data: UserModel) => {
    return createAction(ActionTypes.REGISTRATION_SUCCESS, {data});
  },
  registrationFail: (errors: RequestError) => {
    return createAction(ActionTypes.REGISTRATION_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
