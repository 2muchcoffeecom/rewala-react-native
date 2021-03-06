import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { UserResponse } from '../../../../../../../shared/models/user.model';
import { RequestError } from '../../../../../states';
import { ContactInput } from '../../../../../../../shared/services/contacts.service';

export enum ActionTypes {
  CONTACTS_SEND = 'CONTACTS_SEND',
  CONTACTS_SEND_SUCCESS = 'CONTACTS_SEND_SUCCESS',
  CONTACTS_SEND_FAIL = 'CONTACTS_SEND_FAIL',
}

export const Actions = {
  contactsSend: (data: ContactInput[]) => createAction(ActionTypes.CONTACTS_SEND, {data}),
  contactsSendSuccess: (data: UserResponse[]) => {
    return createAction(ActionTypes.CONTACTS_SEND_SUCCESS, {data});
  },
  contactsSendFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.CONTACTS_SEND_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
