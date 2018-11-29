// import { Action } from 'redux';
// import { Observable } from 'rxjs';
// import { ofType } from 'redux-observable';
// import { map } from 'rxjs/operators';
// import * as fromActions from '../AC';
// import { authRequestAC } from '../../request/nested-states/auth/AC';
//
// const showErrorRequestToastEpic = (action$: Observable<Action>) => action$.pipe(
//   ofType<ReturnType<typeof authRequestAC.login.Actions.loginFail> |
//     ReturnType<typeof authRequestAC.registration.Actions.registrationFail>>(
//     authRequestAC.login.ActionTypes.LOGIN_FAIL,
//     authRequestAC.registration.ActionTypes.REGISTRATION_FAIL,
//   ),
//   map((action) => {
//     const fields = action.payload.errors.fields;
//     const message = action.payload.errors.message;
//     let error;
//
//     if (fields && fields.email && fields.email.unique) {
//       error = fields.email.unique;
//     } else if (message) {
//       error = message;
//     } else {
//       error = '';
//     }
//
//     return fromActions.Actions.showToast(error);
//   }),
// );
//
// export const toastEpics = [
//   showErrorRequestToastEpic,
// ];