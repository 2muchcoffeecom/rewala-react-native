import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import * as fromActions from '../AC';
import { contactsRequestAC, authRequestAC } from '../../request/AC';
import { ProfileModel } from '../../../shared/models/profile.model';

const setProfilesDataEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof contactsRequestAC.sendContacts.Actions.contactsSendSuccess> |
    ReturnType<typeof authRequestAC.login.Actions.loginSuccess> |
    ReturnType<typeof authRequestAC.registration.Actions.registrationSuccess> |
    ReturnType<typeof authRequestAC.newPassword.Actions.newPasswordSuccess>>(
    contactsRequestAC.sendContacts.ActionTypes.CONTACTS_SEND_SUCCESS,
    authRequestAC.login.ActionTypes.LOGIN_SUCCESS,
    authRequestAC.registration.ActionTypes.REGISTRATION_SUCCESS,
    authRequestAC.newPassword.ActionTypes.NEW_PASSWORD_SUCCESS,
  ),
  map((action) => {
    const profiles = Array.isArray(action.payload.data) ?
      action.payload.data.map<ProfileModel>((user) => user.profile) :
      [action.payload.data.profile];

    return fromActions.Actions.setProfilesData(profiles);
  }),
);

export const profilesEpics = [
  setProfilesDataEpic,
];