import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ILoginInput } from "../interfaces";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
  api = "http://localhost:3000/api";
  constructor(private _http: HttpClient) {}

  login(
    credentials: ILoginInput
  ): Observable<{ token: string; message: string }> {
    return this._http
      .post<{ token: string; message: string }>(
        `${this.api}/login`,
        credentials
      )
      .pipe(
        tap(response => {
          sessionStorage.setItem("token", response.token);
        })
      );
  }
}
