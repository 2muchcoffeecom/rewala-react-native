import { Action } from 'redux';
import { Observable, of } from 'rxjs';
import { ofType } from 'redux-observable';
import { catchError, ignoreElements, map, switchMap, tap } from 'rxjs/operators';
import * as fromActions from '../AC';
import { contactsRequestAC, authRequestAC } from '../../request/AC';
import navService from '../../../shared/services/nav.service';
import deviceService, { ContactInput } from '../../../shared/services/device.service';
import { PermissionsAndroid } from 'react-native';
import { Contact } from 'react-native-contacts';

const checkReadContactsPermissionEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof authRequestAC.registration.Actions.registrationSuccess>>(
    authRequestAC.registration.ActionTypes.REGISTRATION_SUCCESS,
  ),
  switchMap(() => deviceService.getReadContactsPermission().pipe(
    map((result) => {
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        return fromActions.Actions.getReadContactsPermissionGranted();
      } else {
        return fromActions.Actions.getReadContactsPermissionDenied();
      }
    }),
  )),
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
    return navService.navigate('HomeBlankScreen');
  }),
  ignoreElements(),
);

export const contactsEpics = [
  checkReadContactsPermissionEpic,
  readContactsPermissionGrantedEpic,
  readContactsPermissionDeniedEpic,
  redirectToFriendsScreenEpic,
];