import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponentsModule } from '../shared/material-components.module';
import { CartItemComponent } from './cart-item/cart-item.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'shipping',
    component: ShippingComponent,
  },
];

@NgModule({
  declarations: [CartComponent, ShippingComponent, CartItemComponent],
  imports: [RouterModule.forChild(routes), MaterialComponentsModule],
  exports: [RouterModule],
})
export class CheckoutModule {}
