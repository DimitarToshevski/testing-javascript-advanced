import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IProduct } from "../shared/interfaces";
import { ProductsService } from "../shared/services";

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
    private _productsService: ProductsService
  ) {}

  ngOnInit() {
    this.productsForm = this._fb.group({
      name: ["", Validators.required],
      quantity: [""]
    });

    this._productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addProduct(): void {
    const product = this.productsForm.value;
    this.productsForm.reset();
    this._productsService.addProduct(product).subscribe(() => {
      this.products.push(product);
    });
  }
}
