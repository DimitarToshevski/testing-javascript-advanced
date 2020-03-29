import {
  IProductsService,
  IProduct,
  IResponse,
  IBaseDTO
} from "@shared/interfaces";
import { Observable, of } from "rxjs";
import {
  createServerResponse,
  createBaseDTO,
  createProduct
} from "../factories";
import { FakeBaseDTO } from "../fakes";

export class MockProductsService implements IProductsService {
  getProducts(): Observable<IResponse<Array<IProduct>>> {
    return of(
      createServerResponse({
        message: null,
        data: [createProduct({ id: "1", name: "fake product", quantity: 3 })]
      })
    );
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
