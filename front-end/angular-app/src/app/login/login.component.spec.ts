import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";

import * as fromStore from "../shared/store";

describe("LoginComponent", () => {
  // Component
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // Store
  let store: MockStore<fromStore.IAuthState>;

  // Spy objects
  let onStoreDispatchSpy: jasmine.Spy;

  // Helpers
  const selectElement = (selector: string): HTMLElement =>
    fixture.nativeElement.querySelector(selector);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    // Component init
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    // Store init
    store = TestBed.get(Store);

    // Spy objects init
    onStoreDispatchSpy = spyOn(store, "dispatch");

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("UI ELEMENTS", () => {
    it("should have a title with text Login", () => {
      expect(selectElement("#title").textContent).toBe("Login");
    });

    describe("INPUTS", () => {
      it("should have a username input with a label and a hint", () => {
        expect(selectElement("#username-label").textContent).toBe("Username");
        expect(
          selectElement("#username-label").attributes.getNamedItem("for").value
        ).toBe("username-input");
        expect(selectElement("#username-input")).toBeTruthy();
        expect(selectElement("#username-hint").textContent).toBe(
          "Enter your username."
        );
      });

      it("should present an error that Username is required if username input is not valid and dirty", () => {
        component.loginForm.get("username").markAsDirty();

        fixture.detectChanges();

        expect(selectElement("#username-error").textContent).toBe(
          "Username is required."
        );
      });

      it("should have a password input with a label and a hint", () => {
        expect(selectElement("#password-label").textContent).toBe("Password");
        expect(
          selectElement("#password-label").attributes.getNamedItem("for").value
        ).toBe("password-input");
        expect(selectElement("#password-input")).toBeTruthy();
        expect(selectElement("#password-hint").textContent).toBe(
          "Enter your password."
        );
      });

      it("should present an error that Password is required if password input is not valid and dirty", () => {
        component.loginForm.get("password").markAsDirty();

        fixture.detectChanges();

        expect(selectElement("#password-error").textContent).toBe(
          "Password is required."
        );
      });
    });

    describe("SUBMIT BUTTON", () => {
      it("should have a submit button with text Login", () => {
        expect(selectElement("#login-button").textContent).toEqual("Login");
        expect(
          selectElement("#login-button").attributes.getNamedItem("type").value
        ).toBe("submit");
      });

      it("should disable the submit button initially", () => {
        expect(
          selectElement("#login-button").attributes.getNamedItem("disabled")
        ).toBeTruthy();
      });

      it("should enable the submit button if the form is valid", () => {
        component.loginForm.get("username").setValue("test");
        component.loginForm.get("password").setValue("test");
        fixture.detectChanges();

        expect(
          selectElement("#login-button").attributes.getNamedItem("disabled")
        ).toBeFalsy();
      });

      it("should disable the submit button if the form is not valid", () => {
        component.loginForm.get("username").setValue("test");
        fixture.detectChanges();

        expect(
          selectElement("#login-button").attributes.getNamedItem("disabled")
        ).toBeTruthy();
      });
    });
  });

  describe("FUNCTIONALITY TESTS", () => {
    describe("SUBMIT FORM", () => {
      it("should dispatch an event on login with form value if the form is valid", () => {
        component.loginForm.get("username").setValue("test");
        component.loginForm.get("password").setValue("test");
        component.login();
        expect(onStoreDispatchSpy).toHaveBeenCalledWith(
          fromStore.login({ payload: { username: "test", password: "test" } })
        );
      });

      it("should not dispatch an event on login if the form is not valid", () => {
        component.login();
        expect(onStoreDispatchSpy).not.toHaveBeenCalled();
      });

      it("should reset the form on login if the form is valid", () => {
        component.loginForm.get("username").setValue("test");
        component.loginForm.get("password").setValue("test");
        component.login();
        expect(component.loginForm.value).toEqual({
          username: null,
          password: null
        });
      });

      it("should not reset the form on login if the form is not valid", () => {
        component.loginForm.get("username").setValue("test");
        component.login();
        expect(component.loginForm.value).toEqual({
          username: "test",
          password: ""
        });
      });
    });

    describe("CHECK CONTROL VALIDITY", () => {
      it("should return true when checking isControlInvalid if the control is not valid and is dirty", () => {
        expect(component.isControlInvalid("username")).toBe(false);

        component.loginForm.get("username").markAsDirty();

        expect(component.isControlInvalid("username")).toBe(true);
      });

      it("should return false when checking isControlInvalid if the control is not valid or is not dirty", () => {
        expect(component.isControlInvalid("username")).toBe(false); // not dirty and not valid

        component.loginForm.get("username").setValue("test"); // not dirty and valid

        expect(component.isControlInvalid("username")).toBe(false);

        component.loginForm.get("username").setValue("test");

        component.loginForm.get("username").markAsDirty(); // dirty and valid

        expect(component.isControlInvalid("username")).toBe(false);
      });
    });
  });
});
