import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { ContactInput } from '../../../shared/services/device.service';

export enum ActionTypes {
  GET_READ_CONTACTS_PERMISSION_GRANTED = 'GET_READ_CONTACTS_PERMISSION_GRANTED',
  GET_READ_CONTACTS_PERMISSION_DENIED = 'GET_READ_CONTACTS_PERMISSION_DENIED',
  SEND_CONTACTS_TO_SERVER = 'SEND_CONTACTS_TO_SERVER',
}

export const Actions = {
  getReadContactsPermissionGranted: () => {
    return createAction(ActionTypes.GET_READ_CONTACTS_PERMISSION_GRANTED);
  },
  getReadContactsPermissionDenied: () => {
    return createAction(ActionTypes.GET_READ_CONTACTS_PERMISSION_DENIED);
  },
  sendContacts: (data: ContactInput[]) => {
    return createAction(ActionTypes.SEND_CONTACTS_TO_SERVER, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
