import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { UserResponse } from '../../../../../../../shared/models/user.model';
import { UpdateUserInput } from '../../../../../../../shared/services/user.service';
import { Reject, RequestError, Resolve } from '../../../../../states';

export enum ActionTypes {
  UPDATE_ME = 'UPDATE_ME',
  UPDATE_ME_SUCCESS = 'UPDATE_ME_SUCCESS',
  UPDATE_ME_FAIL = 'UPDATE_ME_FAIL',
}

export const Actions = {
  updateMe: (
    data: UpdateUserInput, resolve?: Resolve<UserResponse>, reject?: Reject,
  ) => createAction(ActionTypes.UPDATE_ME, {data, resolve, reject}),
  updateMeSuccess: (data: UserResponse) => {
    return createAction(ActionTypes.UPDATE_ME_SUCCESS, {data});
  },
  updateMeFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.UPDATE_ME_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
