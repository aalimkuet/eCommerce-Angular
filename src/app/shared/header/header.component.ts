import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/checkout/checkout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @ViewChild('searchInput') search: ElementRef<any> | undefined;
  noOfProduct: number = 0;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.sharedService.addToCart.subscribe((data) => {
      this.checkoutService.getCartItems().subscribe((data) => {
        let items = Object.values(data);
        this.noOfProduct = items.length;
      });
    });
    this.checkoutService.getCartItems().subscribe((data) => {
      let items = Object.values(data);
      this.noOfProduct = items.length;
    });
  }

  onSearch() {
    console.log(this.search?.nativeElement);
    alert(this.search?.nativeElement.value);
  }
  onCart() {
    //  this.noOfProduct++;
    this.router.navigate(['/cart']);
  }
}
