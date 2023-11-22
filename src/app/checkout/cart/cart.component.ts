import { Component } from '@angular/core';
import { ProductService } from 'src/app/products/product.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  productCarts: any[] = [];

  quantity: number = 1;
  price: number = 0;
  updatedPrice: number = 0;
  productAddToCart: number = 0;
  productName: string = '';
  productLargeImage: string | undefined = '';
  subTotal: number = 0;
  total: number = 0;
  shipping: number = 50;

  constructor(
    private checkoutService: CheckoutService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkoutService.getCartItems().subscribe((data) => {
      let items = Object.values(data);
      this.productCarts = items.map((item) => {
        this.subTotal += item.product.price;
        return item;
      });

      this.total = this.shipping + this.subTotal;
    });
  }

  addQuantity(productCart: any) {
    if (productCart.product.quantity <= 10) {
      let price = productCart.product.price;
      productCart.product.quantity++;
      this.subTotal = this.subTotal + price;
      this.total = this.shipping + this.subTotal;
    }
  }
  removeQuantity(productCart: any) {
    if (productCart.product.quantity > 1) {
      let price = productCart.product.price;
      productCart.product.quantity--;
      this.subTotal = this.subTotal - price;
      this.total = this.shipping + this.subTotal;
    }
  }

  onSubmit() {
    this.toastr.success('', 'Cart item deleted successfully!');
  }

  removeCartItem(productId: number) {
    this.checkoutService.deleteCartItem(productId).subscribe(
      (product) => {
        console.log(product);
        this.toastr.success('', 'Cart item deleted successfully!');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
