import { async, TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { AuthGuard } from "./auth.guard";

fdescribe("AuthGuard", () => {
  let guard: AuthGuard;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    guard = TestBed.get(AuthGuard);
  });

  it("should create", () => {
    expect(guard).toBeTruthy();
  });
});
