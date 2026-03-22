import { inject, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FacilityService } from '../../services/facility.service';
import { CategoryFilters } from '../../components/category-filters/category-filters';
import { SearchBar } from '../../components/search-bar/search-bar';
import { ResultsList } from '../../components/results-list/results-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CategoryFilters, SearchBar, ResultsList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private facilityService = inject(FacilityService);

  facilities = this.facilityService.facilities;
  isLoading = this.facilityService.isLoading;

  onSearch(query: string) {
    this.facilityService.setSearch(query);
  }

  onCategory(category: string) {
    this.facilityService.setCategory(category);
  }
}
