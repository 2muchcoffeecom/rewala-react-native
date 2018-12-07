import { from, Observable, ObservableInput } from 'rxjs';
import gql from 'graphql-tag';
import { execute } from 'apollo-link';

import link from '../middlewares/link.middleware';
import { followRequest, myFollowRequest } from '../templates/followRequest.template';
import { FollowRequestStatus } from '../models/followRequest.model';

interface CreateFollowRequestInput {
  toUserId: string;
}

export interface UpdateFollowRequestInput {
  _id: string;
  status: FollowRequestStatus;
}

interface IFriendService {
  createFollowRequest(input: CreateFollowRequestInput): Observable<any>;
  updateFollowRequest(input: UpdateFollowRequestInput): Observable<any>;
  getMyFollowRequest(): Observable<any>;
}

class FriendService implements IFriendService {

  createFollowRequest(input: CreateFollowRequestInput) {
    const operation = {
      query: gql`
        mutation createFollowRequest($input: CreateFollowRequestInput) {
          createFollowRequest(input: $input) ${followRequest}
        }
      `,
      variables: {
        input,
      },
    };

    return from(execute(link, operation) as ObservableInput<any>);
  }

  updateFollowRequest(input: UpdateFollowRequestInput) {
    const operation = {
      query: gql`
        mutation updateFollowRequest($input: UpdateFollowRequestInput) {
          updateFollowRequest(input: $input) ${followRequest}
        }
      `,
      variables: {
        input,
      },
    };

    return from(execute(link, operation) as ObservableInput<any>);
  }

  getMyFollowRequest() {
    const operation = {
      query: gql`
        query {
          myFollowRequests ${myFollowRequest}
        }
      `,
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }
}

export default new FriendService();