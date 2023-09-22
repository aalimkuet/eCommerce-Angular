import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../products/product-item/product-item.component';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { PopularProductComponent } from './popular-product/popular-product.component'; 
import { MatIconModule } from '@angular/material/icon'; 
import {ProductRatingComponent} from './product-rating/product-rating.component';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product-list', component: ProductDetailComponent },
];

@NgModule({
  declarations: [
    ProductItemComponent,
    ProductDetailComponent,
    ProductListComponent,
    CarouselComponent,
    CategoryComponent,
    PopularProductComponent,
    ProductRatingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbCarouselModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [RouterModule],
})
export class ProductsModule {}
