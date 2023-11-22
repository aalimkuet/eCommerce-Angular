import { Component } from '@angular/core';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchString: string = '';
  searchResults: any[] = [];
  searchTime: number = 0;

  constructor(private personService: PersonService) {}

  search() {
    const startTime = performance.now();

    if (this.searchString.trim() !== '') {
      this.personService.search(this.searchString).subscribe(
        (data: any[]) => {
          this.searchResults = data;
          const endTime = performance.now();
          this.searchTime = endTime - startTime;
        },
        (error: any) => {
          console.error(error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }
}
