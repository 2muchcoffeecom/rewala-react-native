import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';

export enum ActionTypes {
  TOAST_SHOW = 'TOAST_SHOW',
  TOAST_RESET = 'TOAST_RESET',
}

export const Actions = {
  showToast: (message: string | null = null) => {
    return createAction(ActionTypes.TOAST_SHOW, {message});
  },
  hideToast: () => createAction(ActionTypes.TOAST_RESET),
};

export type Actions = ActionsUnion<typeof Actions>;
