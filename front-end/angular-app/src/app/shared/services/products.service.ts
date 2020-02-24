import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IProduct } from "../interfaces";

@Injectable({ providedIn: "root" })
export class ProductsService {
  api = "http://localhost:3000/api";
  constructor(private _http: HttpClient) {}

  getProducts(): Observable<Array<IProduct>> {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: token });
    return this._http.get<Array<IProduct>>(`${this.api}/products`, { headers });
  }

  addProduct(product: IProduct): Observable<{ message: string }> {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: token });
    return this._http.post<{ message: string }>(
      `${this.api}/products`,
      product,
      {
        headers
      }
    );
  }
}