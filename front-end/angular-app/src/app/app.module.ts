import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";

import * as fromAuthStore from "@shared/store";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromAuthStore.AuthReducer),
    EffectsModule.forRoot([fromAuthStore.AuthEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
