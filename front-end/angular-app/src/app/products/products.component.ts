import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProductsService } from "@shared/services";
import { IProduct } from "@shared/interfaces";

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
      quantity: ["", Validators.required]
    });

    this._productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addProduct(): void {
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
}
