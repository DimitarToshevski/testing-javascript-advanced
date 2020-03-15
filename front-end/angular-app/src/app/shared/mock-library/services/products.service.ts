import {
  IProductsService,
  IProduct,
  IResponse,
  IBaseDTO
} from "@shared/interfaces";
import { Observable, of } from "rxjs";
import { createServerResponse, createBaseDTO } from "../factories";
import { FakeBaseDTO } from "../fakes";

export class MockProductsService implements IProductsService {
  getProducts(): Observable<IResponse<Array<IProduct>>> {
    return of(null);
  }

  addProduct(_product: IProduct): Observable<IResponse<IBaseDTO>> {
    return of(
      createServerResponse({ message: null, data: createBaseDTO(FakeBaseDTO) })
    );
  }

  deleteProduct(_productId: string): Observable<IResponse> {
    return of(null);
  }
}
