import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  addToCart = new Subject<number>();
  buyNow = new Subject<boolean>();
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTokenParam = (): any => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString != null) {
      const userData = JSON.parse(userDataString);
      const queryParams = {
        auth: userData._token,
      };
      const params = new HttpParams({ fromObject: queryParams });
      return params;
    }
    return '';
  };

  getUserId = (): any => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString != null) {
      const userData = JSON.parse(userDataString);
      return userData.id;
    }
    return '';
  };
}
