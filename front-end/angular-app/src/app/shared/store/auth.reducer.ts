import { on, createReducer, Action } from "@ngrx/store";

import { User } from "@shared/models";

import * as fromActions from "./auth.actions";

export interface AuthState {
  user: User;
  loading: boolean;
  errorMessage: string;
}

export const authInitialState: AuthState = {
  user: null,
  loading: false,
  errorMessage: null
};

const authReducer = createReducer(
  authInitialState,
  on(fromActions.login, state => ({ ...state, loading: true })),
  on(fromActions.loginSuccess, (state, { payload }) => ({
    ...state,
    user: payload,
    loading: authInitialState.loading,
    errorMessage: authInitialState.errorMessage
  })),
  on(fromActions.loginFailed, (state, { payload }) => ({
    ...state,
    errorMessage: payload.message,
    loading: authInitialState.loading
  })),
  on(fromActions.logout, () => ({ ...authInitialState }))
);

export function AuthReducer(state: AuthState, action: Action): AuthState {
  return authReducer(state, action);
}
