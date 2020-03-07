import { Observable } from "rxjs";
import { IProduct } from "./IProduct";
import { IResponse } from "./IResponse";
import { IBaseDTO } from "./IBaseDTO";

export interface IProductsService {
  getProducts(): Observable<Array<IProduct>>;
  addProduct(product: IProduct): Observable<IResponse<IBaseDTO>>;
  deleteProduct(productId: string): Observable<IResponse>;
}
