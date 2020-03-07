import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map } from "rxjs/operators";
import { AuthService } from "@shared/services";
import { Router } from "@angular/router";
import { IResponse, ILoginResponseData } from "@shared/interfaces";

import * as fromActions from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _router: Router
  ) {}

  login$: Observable<IResponse<ILoginResponseData>> = createEffect(
    () =>
      this._actions$.pipe(
        ofType(fromActions.login),
        switchMap(({ payload }) => this._authService.login(payload))
      ),
    { dispatch: false }
  );

  loginSuccess$: Observable<Promise<boolean>> = createEffect(
    () =>
      this._actions$.pipe(
        ofType(fromActions.loginSuccess),
        map(() => this._router.navigateByUrl("/products"))
      ),
    { dispatch: false }
  );

  logout$: Observable<Promise<boolean>> = createEffect(
    () =>
      this._actions$.pipe(
        ofType(fromActions.logout),
        map(() => {
          sessionStorage.removeItem("token");
          return this._router.navigateByUrl("/");
        })
      ),
    { dispatch: false }
  );

  persistToken$: Observable<void> = createEffect(
    () =>
      this._actions$.pipe(
        ofType(fromActions.persistToken),
        map(({ payload }) => {
          sessionStorage.setItem("token", payload.token);
        })
      ),
    { dispatch: false }
  );
}
