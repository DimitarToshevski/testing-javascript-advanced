import { CanActivate, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import { map, tap } from "rxjs/operators";

import * as fromAuthStore from "@shared/store";

export class AnonymousGuard implements CanActivate {
  constructor(
    private _store: Store<fromAuthStore.IAuthState>,
    private _router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this._store.select(fromAuthStore.selectUser).pipe(
      map(u => u === null && sessionStorage.getItem("token") === null),
      tap(anonymous => {
        if (!anonymous) {
          this._router.navigateByUrl("/products");

          return of(false);
        }
      })
    );
  }
}
