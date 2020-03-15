import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  IProduct,
  IResponse,
  IBaseDTO,
  IProductsService
} from "@shared/interfaces";
import { API_PREFIX } from "@shared/injection-tokens";

@Injectable({ providedIn: "root" })
export class ProductsService implements IProductsService {
  constructor(@Inject(API_PREFIX) private api, private _http: HttpClient) {}

  getProducts(): Observable<IResponse<Array<IProduct>>> {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: token });

    return this._http.get<IResponse<Array<IProduct>>>(`${this.api}/products`, {
      headers
    });
  }

  addProduct(product: IProduct): Observable<IResponse<IBaseDTO>> {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: token });

    return this._http.post<IResponse<IBaseDTO>>(
      `${this.api}/products`,
      product,
      {
        headers
      }
    );
  }

  deleteProduct(productId: string): Observable<IResponse> {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: token });

    return this._http.delete<IResponse>(`${this.api}/products/${productId}`, {
      headers
    });
  }
}
