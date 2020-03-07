import { createAction, props } from "@ngrx/store";
import { ILoginInput, IResponse } from "@shared/interfaces";
import { User } from "@shared/models";

export const login = createAction(
  "[Auth] Login",
  props<{ payload: ILoginInput }>()
);

export const loginSuccess = createAction(
  "[Auth] Login Success",
  props<{ payload: User }>()
);

export const loginFailed = createAction(
  "[Auth] Login Failed",
  props<{ payload: IResponse }>()
);

export const logout = createAction("[Auth] Logout");

export const persistToken = createAction(
  "[Auth] Persist Token",
  props<{ payload: { token: string } }>()
);
