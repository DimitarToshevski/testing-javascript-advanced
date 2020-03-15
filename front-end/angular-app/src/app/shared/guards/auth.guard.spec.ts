import { async, TestBed } from "@angular/core/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthGuard } from "./auth.guard";

import * as fromAuth from "@shared/store";

fdescribe("AuthGuard", () => {
  // Guard
  let guard: AuthGuard;

  // Services
  let router: Router;

  // Store
  let store: MockStore<fromAuth.IAuthState>;

  // Spy objects
  let onNavigateSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    // Guard init
    guard = TestBed.get(AuthGuard);

    // Services init
    router = TestBed.get(Router);

    // Store init
    store = TestBed.get(Store);

    // Spy objects init
    onNavigateSpy = spyOn(router, "navigateByUrl");

    // Helpers
    store.overrideSelector(fromAuth.selectUser, null);
    sessionStorage.clear();
  });

  it("should create", () => {
    expect(guard).toBeTruthy();
  });

  describe("ALLOWED NAVIGATION SCENARIOS", () => {
    it("should pass if there is a user in the state", () => {
      store.overrideSelector(fromAuth.selectUser, {
        username: "Some username"
      });

      guard.canActivate().subscribe(canActivate => {
        expect(canActivate).toBe(true);
      });
    });

    it("should pass if there is a token in the session storage", () => {
      sessionStorage.setItem("token", "some token");

      guard.canActivate().subscribe(canActivate => {
        expect(canActivate).toBe(true);
      });
    });
  });

  describe("DISALLOWED NAVIGATION SCENARIOS", () => {
    it("should not pass if there is not a user in the state and no token in the session storage", () => {
      guard.canActivate().subscribe(canActivate => {
        expect(canActivate).toBe(false);
      });
    });

    it("should navigate to '/' if there is not a user in the state or a token in the session storage", () => {
      guard.canActivate().subscribe(() => {
        expect(onNavigateSpy).toHaveBeenCalledWith("/");
      });
    });
  });
});
