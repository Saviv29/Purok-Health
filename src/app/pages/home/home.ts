import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

import { FacilityService } from '../../services/facility.service';
import { CategoryFilters } from '../../components/category-filters/category-filters';
import { ResultsList } from '../../components/results-list/results-list';
import { SearchBar } from '../../components/search-bar/search-bar';
import { StatusMockController } from '../../components/status-mock-controller/status-mock-controller';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBar, CategoryFilters, ResultsList, StatusMockController],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  query = signal('');
  category = signal('');

  constructor(private readonly facilityService: FacilityService) {}

  results = computed(() => {
    return this.facilityService.search(this.query(), this.category())();
  });

  get availabilityOverrides() {
    return this.facilityService.availabilityOverrides();
  }

  onSearch(query: string) {
    this.query.set(query);
  }

  onCategory(category: string) {
    this.category.set(category);
  }
}
