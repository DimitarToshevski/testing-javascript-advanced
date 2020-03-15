import { CanActivate, Router } from "@angular/router";
import { map, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";

import { Store } from "@ngrx/store";

import * as fromAuthStore from "@shared/store";

export class AuthGuard implements CanActivate {
  constructor(
    private _store: Store<fromAuthStore.IAuthState>,
    private _router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this._store.select(fromAuthStore.selectUser).pipe(
      map(u => !!u || !!sessionStorage.getItem("token")),
      tap(authenticated => {
        if (!authenticated) {
          this._router.navigateByUrl("/");
          return of(false);
        }
      })
    );
  }
}
