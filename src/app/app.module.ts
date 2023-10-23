import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutModule } from './checkout/checkout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ProductsModule,
    NgbModule,
    CheckoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
