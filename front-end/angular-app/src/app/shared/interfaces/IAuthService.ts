import { ILoginInput } from "./ILoginInput";
import { Observable } from "rxjs";
import { IResponse } from "./IResponse";
import { ILoginResponseData } from "./ILoginResponseData";

export interface IAuthService {
  api: string;

  login(credentials: ILoginInput): Observable<IResponse<ILoginResponseData>>;
}
