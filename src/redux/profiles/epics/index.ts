import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import * as fromActions from '../AC';
import { contactsRequestAC } from '../../request/nested-states/contacts/AC';
import { ProfileModel } from '../../../shared/models/profile.model';

const setProfilesDataEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof contactsRequestAC.sendContacts.Actions.contactsSendSuccess>>(
    contactsRequestAC.sendContacts.ActionTypes.CONTACTS_SEND_SUCCESS,
  ),
  map((action) => {
    const profiles = action.payload.data.map<ProfileModel>((user) => user.profile);

    return fromActions.Actions.setProfilesData(profiles);
  }),
);

export const profilesEpics = [
  setProfilesDataEpic,
];