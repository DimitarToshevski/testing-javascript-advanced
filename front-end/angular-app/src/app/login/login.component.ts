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
    private _store: Store<fromStore.IAuthState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this._store.dispatch(fromStore.login({ payload: this.loginForm.value }));

    this.loginForm.reset();
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !control.valid && control.dirty;
  }
}
