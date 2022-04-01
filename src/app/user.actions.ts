import { createAction, props } from '@ngrx/store';
import { User } from './models/user';

export const addUser = createAction(
  '[user] Add User',
  (user: User) => ({user})
)