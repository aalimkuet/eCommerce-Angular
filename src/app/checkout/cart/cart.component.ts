import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
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
  price: number = 150;
  updatedPrice: number = 150;
  productAddToCart: number = 0;
  productName: string = '';
  productLargeImage: string | undefined = '';

  constructor(
    private checkoutService: CheckoutService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkoutService.getCartItems().subscribe((data) => {
      let items = Object.values(data);
      const observables = items.map((element) => {
        return this.productService.getProductById(element.productId);
      });
      forkJoin(observables).subscribe((productArray) => {
        let product = productArray;
        console.log(product);
        product.forEach((element) => {
          this.productCarts.push(Object.values(element)[0]);
          console.log();
        });
      });
    });
  }

  addQuantity() {
    if (this.quantity < 10) {
      this.quantity++;
      this.updatedPrice = this.price * this.quantity;
    }
  }
  removeQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updatedPrice = this.price * this.quantity;
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
