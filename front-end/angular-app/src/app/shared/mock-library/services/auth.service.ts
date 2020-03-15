import {
  IAuthService,
  IResponse,
  ILoginResponseData
} from "@shared/interfaces";
import { Observable, of } from "rxjs";

// HOMEWORK - create a MockAuthService similar to MockProductsService
export class MockAuthService implements IAuthService {
  login(_credentials): Observable<IResponse<ILoginResponseData>> {
    return of(null);
  }
}
