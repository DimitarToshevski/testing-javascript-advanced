import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../shared/services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login(): void {
    this._authService.login(this.loginForm.value).subscribe(data => {
      console.log(data);
      this._router.navigateByUrl("/products");
    });
  }
}
