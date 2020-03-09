import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { AuthGuard, AnonymousGuard } from "@shared/guards";

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.module").then(m => m.ProductsModule),
    canActivate: [AuthGuard]
  },
  { path: "", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AnonymousGuard]
})
export class AppRoutingModule {}
