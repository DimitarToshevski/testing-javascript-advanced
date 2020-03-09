import { ActionReducerMap } from "@ngrx/store";
import { IAuthState, reducer } from "./auth.reducer";
import { AuthEffects } from "./auth.effects";

export * from "./auth.actions";
export * from "./auth.effects";
export * from "./auth.reducer";

export interface IAppState {
  auth: IAuthState;
}

export const effects = [AuthEffects];

export const reducers: ActionReducerMap<IAppState> = {
  auth: reducer
};
