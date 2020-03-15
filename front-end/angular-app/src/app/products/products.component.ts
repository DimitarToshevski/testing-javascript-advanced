import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProductsService } from "@shared/services";
import { IProduct } from "@shared/interfaces";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

import * as fromAuthStore from "@shared/store";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  productsForm: FormGroup;
  products: Array<IProduct> = [];

  constructor(
    private _fb: FormBuilder,
    private _productsService: ProductsService,
    private _store: Store<fromAuthStore.IAuthState>
  ) {}

  ngOnInit() {
    this.productsForm = this._fb.group({
      name: ["", [Validators.required, Validators.pattern(/[a-zA-Z]/)]],
      quantity: ["", [Validators.required, Validators.max(100)]]
    });

    this._productsService
      .getProducts()
      .pipe(map(response => response.data))
      .subscribe(products => {
        this.products = products;
      });
  }

  addProduct(): void {
    if (!this.productsForm.valid) {
      return;
    }

    const product = this.productsForm.value;

    this.productsForm.reset();

    this._productsService.addProduct(product).subscribe(res => {
      this.products.push({ ...product, id: res.data.id });
    });
  }

  deleteProduct({ id }): void {
    this._productsService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== id);
    });
  }

  logout(): void {
    this._store.dispatch(fromAuthStore.logout());
  }

  isControlInvalid(controlName: string): string {
    const control = this.productsForm.get(controlName);

    return (
      !control.valid && control.dirty && Object.keys(control.errors).toString()
    );
  }
}
