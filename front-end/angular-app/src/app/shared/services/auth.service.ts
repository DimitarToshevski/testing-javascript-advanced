import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import {
  ILoginInput,
  IAuthService,
  ILoginResponseData,
  IResponse
} from "@shared/interfaces";
import { Store } from "@ngrx/store";

import * as fromAuthReducer from "../store/auth.reducer";
import * as fromAuthActions from "../store/auth.actions";

@Injectable({ providedIn: "root" })
export class AuthService implements IAuthService {
  api = "http://localhost:3000/api";

  constructor(
    private _http: HttpClient,
    private _store: Store<fromAuthReducer.AuthState>
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
              payload: { username: response.data.username }
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
