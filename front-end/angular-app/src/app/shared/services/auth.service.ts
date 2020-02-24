import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ILoginInput } from "../interfaces";

@Injectable({ providedIn: "root" })
export class AuthService {
  api = "http://localhost:3000/api";
  constructor(private _http: HttpClient) {}

  login(credentials: ILoginInput) {
    return this._http.post(`${this.api}/login`, credentials);
  }
}
