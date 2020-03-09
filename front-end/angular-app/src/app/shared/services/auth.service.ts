import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { Store } from "@ngrx/store";

import {
  ILoginInput,
  IAuthService,
  ILoginResponseData,
  IResponse
} from "@shared/interfaces";
import { User } from "@shared/models";
import { API_PREFIX } from "@shared/injection-tokens";

import * as fromAuthReducer from "../store/auth.reducer";
import * as fromAuthActions from "../store/auth.actions";

@Injectable({ providedIn: "root" })
export class AuthService implements IAuthService {
  constructor(
    @Inject(API_PREFIX) private api,
    private _http: HttpClient,
    private _store: Store<fromAuthReducer.IAuthState>
  ) {}

  login(credentials: ILoginInput): Observable<IResponse<ILoginResponseData>> {
    return this._http
      .post<IResponse<ILoginResponseData>>(`${this.api}/login`, credentials)
      .pipe(
        tap(response => {
          this._store.dispatch(
            fromAuthActions.persistToken({
              payload: { token: response.data.token }
            })
          );

          this._store.dispatch(
            fromAuthActions.loginSuccess({
              payload: new User(response.data)
            })
          );
        }),
        catchError(err => {
          this._store.dispatch(
            fromAuthActions.loginFailed({
              payload: err
            })
          );

          return throwError(err.message);
        })
      );
  }
}
