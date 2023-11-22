import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiUrl = 'https://localhost:7068/api/person/search';

  constructor(private http: HttpClient) {}

  search(searchString: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?searchString=${searchString}`);
  }
}
