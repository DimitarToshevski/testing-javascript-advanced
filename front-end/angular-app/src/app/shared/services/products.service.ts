import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IProduct, IResponse } from "@shared/interfaces";

@Injectable({ providedIn: "root" })
export class ProductsService {
  api = "http://localhost:3000/api";

  constructor(private _http: HttpClient) {}

  getProducts(): Observable<Array<IProduct>> {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: token });

    return this._http.get<Array<IProduct>>(`${this.api}/products`, { headers });
  }

  addProduct(product: IProduct): Observable<IResponse<{ id: string }>> {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: token });

    return this._http.post<IResponse<{ id: string }>>(
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
