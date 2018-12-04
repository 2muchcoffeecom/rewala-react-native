import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { FollowRequest } from '../../../shared/models/followRequest.model';

export enum ActionTypes {
  SET_FOLLOW_REQUEST_DATA = 'SET_FOLLOW_REQUEST_DATA',
}

export const Actions = {
  setUsersData: (data: FollowRequest[]) => {
    return createAction(ActionTypes.SET_FOLLOW_REQUEST_DATA, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
