import { NgModule } from "@angular/core";
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ScratchTextDirective } from "@shared/directives";
import { ErrorMessagePipe } from "@shared/pipes";

@NgModule({
  imports: [ProductsRoutingModule, ReactiveFormsModule, CommonModule],
  declarations: [ProductsComponent, ScratchTextDirective, ErrorMessagePipe]
})
export class ProductsModule {}
