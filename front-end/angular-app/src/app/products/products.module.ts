import { NgModule } from "@angular/core";
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [ProductsRoutingModule, ReactiveFormsModule, CommonModule],
  declarations: [ProductsComponent]
})
export class ProductsModule {}
