import { NgModule } from "@angular/core";
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ScratchTextDirective } from "@shared/directives";

@NgModule({
  imports: [ProductsRoutingModule, ReactiveFormsModule, CommonModule],
  declarations: [ProductsComponent, ScratchTextDirective]
})
export class ProductsModule {}
