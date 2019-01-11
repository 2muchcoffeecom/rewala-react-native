import { Platform } from 'react-native';
import { Action } from 'redux';
import { Observable, of } from 'rxjs';
import { ofType } from 'redux-observable';
import { catchError, ignoreElements, map, switchMap, tap } from 'rxjs/operators';
import * as fromActions from '../AC';
import { contactsRequestAC, authRequestAC } from '../../request/AC';
import navService from '../../../shared/services/nav.service';
import deviceService from '../../../shared/services/device.service';
import { ContactInput } from '../../../shared/services/contacts.service';
import { PermissionsAndroid } from 'react-native';
import { Contact } from 'react-native-contacts';

const checkReadContactsPermissionEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof authRequestAC.registration.Actions.registrationSuccess>>(
    authRequestAC.registration.ActionTypes.REGISTRATION_SUCCESS,
  ),
  Platform.select({
    android:
      switchMap(() => deviceService.getReadContactsPermission().pipe(
        map((result) => {
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            return fromActions.Actions.getReadContactsPermissionGranted();
          } else {
            return fromActions.Actions.getReadContactsPermissionDenied();
          }
        }),
      )),
    ios:
      ignoreElements(),
  }),
);

const readContactsPermissionGrantedEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.GET_READ_CONTACTS_PERMISSION_GRANTED),
  switchMap(() => deviceService.getDeviceContacts().pipe(
    map((result: Contact[] | string) => {

      if (Array.isArray(result)) {
        const contactsInput: ContactInput[] = result.map<ContactInput>(
          (contact) => ({
            emails: contact.emailAddresses.map<string>((emailAddress) => emailAddress.email),
            phones: contact.phoneNumbers.map<string>((phoneNumber) => phoneNumber.number),
          }),
        );
        return contactsRequestAC.sendContacts.Actions.contactsSend(contactsInput);
      }
      return contactsRequestAC.sendContacts.Actions.contactsSendFail(result);
    }),
    catchError((errors) => {
      return of(contactsRequestAC.sendContacts.Actions.contactsSendFail(errors));
    }),
    ),
  ),
);

const redirectToFriendsScreenEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof contactsRequestAC.sendContacts.Actions.contactsSendSuccess>>(
    contactsRequestAC.sendContacts.ActionTypes.CONTACTS_SEND_SUCCESS,
  ),
  tap((action) => {
    const users = action.payload.data;

    if (users.length !== 0) {
      navService.navigate('AddFriendsScreen');
    } else {
      navService.navigate('NoFriendsScreen');
    }
  }),
  ignoreElements(),
);

const readContactsPermissionDeniedEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.GET_READ_CONTACTS_PERMISSION_DENIED),
  tap(() => {
    return navService.navigate('HomeScreen');
  }),
  ignoreElements(),
);

const setContactsUserIdEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof contactsRequestAC.sendContacts.Actions.contactsSendSuccess>>(
    contactsRequestAC.sendContacts.ActionTypes.CONTACTS_SEND_SUCCESS,
  ),
  map((action) => {
    const contactsUserId = action.payload.data.map<string>((user) => user._id);
    return fromActions.Actions.setContactsUserId(contactsUserId);
  }),
);

const deleteContactsUserIdEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof authRequestAC.logout.Actions.logoutSuccess>>(
    authRequestAC.logout.ActionTypes.LOGOUT_SUCCESS,
  ),
  map(() => {
    return fromActions.Actions.deleteContactsUserId();
  }),
);

export const contactsEpics = [
  checkReadContactsPermissionEpic,
  readContactsPermissionGrantedEpic,
  readContactsPermissionDeniedEpic,
  redirectToFriendsScreenEpic,
  setContactsUserIdEpic,
  deleteContactsUserIdEpic,
];