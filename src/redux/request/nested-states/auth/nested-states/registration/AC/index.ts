import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { IUserModel } from '../../../../../../../shared/models/user.model';
import { Reject, RequestError, Resolve } from '../../../../../states';
import { UserInput } from '../../../../../../../shared/services/auth.service';

export enum ActionTypes {
  REGISTRATION = 'REGISTRATION',
  REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  REGISTRATION_FAIL = 'REGISTRATION_FAIL',
}

export const Actions = {
  registration: (data: UserInput, resolve: Resolve<IUserModel>, reject: Reject) => createAction(
    ActionTypes.REGISTRATION, {data, resolve, reject},
  ),
  registrationSuccess: (data: IUserModel) => {
    return createAction(ActionTypes.REGISTRATION_SUCCESS, {data});
  },
  registrationFail: (errors: RequestError) => {
    return createAction(ActionTypes.REGISTRATION_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
