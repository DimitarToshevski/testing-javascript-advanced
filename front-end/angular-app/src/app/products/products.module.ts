import { NgModule } from "@angular/core";
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products-routing.module";

@NgModule({
  imports: [ProductsRoutingModule],
  declarations: [ProductsComponent]
})
export class ProductsModule {}
