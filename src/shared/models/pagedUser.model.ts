import { UserResponse } from './user.model';

export class PagedUserModel {
  results: [UserResponse];
  next: string = '';
  hasNext: boolean = false;
  previous: string = '';
  hasPrevious: boolean = false;

  constructor(obj: PagedUserModel) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj[field];
      }
    }
  }
}

export interface PagedResponseOf<E> {
  results: E[];
  next: string;
  hasNext: boolean;
  previous: string;
  hasPrevious: boolean;
}