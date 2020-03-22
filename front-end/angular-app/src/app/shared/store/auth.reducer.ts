import {
  on,
  createReducer,
  Action,
  createSelector,
  createFeatureSelector
} from "@ngrx/store";

import { User } from "@shared/models";

import * as fromActions from "./auth.actions";

export interface IAuthState {
  user: User;
  loading: boolean;
  errorMessage: string;
}

export const authInitialState: IAuthState = {
  user: null,
  loading: false,
  errorMessage: null
};

const authReducer = createReducer(
  authInitialState,
  on(fromActions.login, state => ({ ...state, loading: true })),
  on(fromActions.loginSuccess, (state, { payload }) => ({
    ...state,
    user: payload.user,
    loading: authInitialState.loading,
    errorMessage: authInitialState.errorMessage
  })),
  on(fromActions.loginFailed, (state, { payload }) => ({
    ...state,
    errorMessage: payload.errorMessage,
    loading: authInitialState.loading
  })),
  on(fromActions.logout, () => ({ ...authInitialState }))
);

export function reducer(
  state: IAuthState = authInitialState,
  action: Action
): IAuthState {
  return authReducer(state, action);
}

export const selectAuthState = createSelector(
  createFeatureSelector<IAuthState>("auth"),
  state => state
);

export const selectUser = createSelector(selectAuthState, state => state.user);
