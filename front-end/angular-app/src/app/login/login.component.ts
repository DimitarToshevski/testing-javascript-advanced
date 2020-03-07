import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import * as fromStore from "@shared/store";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromStore.AuthState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login(): void {
    this._store.dispatch(fromStore.login({ payload: this.loginForm.value }));
  }
}
