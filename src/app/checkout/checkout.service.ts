import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/shared.service';
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  getCountries(): Observable<any> {
    const url = `${this.baseUrl}countries.json`;
    return this.http.get<any>(url);
  }
  getDivisions(): Observable<any> {
    const url = `${this.baseUrl}divisions.json`;
    return this.http.get<any>(url);
  }
  getDistricts(divisionId: number): Observable<any> {
    const url = `${this.baseUrl}districts.json?orderBy="division_id"&equalTo="${divisionId}"`;
    return this.http.get<any>(url);
  }
  getUpazilas(districtId: number): Observable<any> {
    const url = `${this.baseUrl}upazilas.json?orderBy="district_id"&equalTo="${districtId}"`;
    return this.http.get<any>(url);
  }
  getPaymentMethods(): Observable<any> {
    const url = `${this.baseUrl}payment_methods.json`;
    return this.http.get<any>(url);
  }

  addCartItem = (productId: number) => {
    const url = `${this.baseUrl}shopping_carts.json`;
    const payLoad = {
      productId: productId,
      user_id: this.sharedService.getUserId(),
    };
    return this.http.post(url, payLoad);
  };
  getCartItems(): Observable<any[]> {
    const url = `${this.baseUrl}shopping_carts.json`;
    return this.http.get<any[]>(url);
  }

  deleteCartItem(productId: number): Observable<any> {
    const url = `${
      this.baseUrl
    }shopping_carts.json?orderBy="productId"&equalTo=${productId}&equalTo=${this.sharedService.getUserId()}`;

    return this.http.get(url).pipe(
      switchMap((data) => {
        const cartId = Object.keys(data)[0]; 

        if (!cartId) {
          throw new Error('Cart ID not found');
        }

        const deleteUrl = `${this.baseUrl}shopping_carts/${cartId}.json`;
        console.log(deleteUrl);
        return this.http.delete(deleteUrl);
      })
    );
  }
}
