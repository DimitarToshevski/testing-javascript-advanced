import {
  IProductsService,
  IProduct,
  IResponse,
  IBaseDTO
} from "@shared/interfaces";
import { Observable, of } from "rxjs";

export class MockProductsService implements IProductsService {
  getProducts(): Observable<IResponse<Array<IProduct>>> {
    return of(null);
  }

  addProduct(_product: IProduct): Observable<IResponse<IBaseDTO>> {
    return of(null);
  }

  deleteProduct(_productId: string): Observable<IResponse> {
    return of(null);
  }
}
