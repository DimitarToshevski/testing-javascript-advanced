import { ILoginInput } from "./ILoginInput";
import { Observable } from "rxjs";
import { IResponse } from "./IResponse";
import { ILoginResponseData } from "./ILoginResponseData";

export interface IAuthService {
  login(credentials: ILoginInput): Observable<IResponse<ILoginResponseData>>;
}
