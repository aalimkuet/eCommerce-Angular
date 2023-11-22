import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { CheckoutService } from '../../checkout/checkout.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  quantity: number = 1;
  price: number = 150;
  updatedPrice: number = 150;
  productAddToCart: number = 0;
  product: Product | any;
  productName: string = '';
  productLargeImage: string | undefined = '';

  constructor(
    private sharedService: SharedService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private checkoutService: CheckoutService
  ) {}
  ngOnInit() {
    this.productService.product$.subscribe((product) => {
      this.product = product;
    });

    this.route.params.subscribe((params) => {
      this.productName = params['name'];
      // Use the productName to fetch the product details as needed
    });

    // this.productService.testData.subscribe((data) => {
    //   this.productTitle = data;
    //   console.log(this.productTitle);
    // });

    this.product = this.productService.productData;
    this.productLargeImage = this.product?.images[0];
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
  addToCart() {
    this.product.quantity = this.quantity;
    this.checkoutService.addCartItem(this.product).subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
    this.sharedService.addToCart.next(++this.productAddToCart);
  }
  onBuyNow() {
    const user = localStorage.getItem('userData');
    if (!!user) {
      this.router.navigate(['/shipping']);
    } else {
      this.sharedService.buyNow.next(true);
    }
  }
  onImageClick(event: any) {
    this.productLargeImage = event.target.src;
  }
}
