import { Component, input, inject } from '@angular/core';

import { Facility } from '../../models/facility';
import { FacilityService } from '../../services/facility.service';
import { FacilityCard } from '../facility-card/facility-card';
import { EmptyState } from '../empty-state/empty-state';
import { LoadingSkeleton } from '../loading-skeleton/loading-skeleton';

@Component({
  selector: 'app-results-list',
  standalone: true,
  imports: [FacilityCard, EmptyState, LoadingSkeleton],
  templateUrl: './results-list.html',
  styleUrl: './results-list.css',
})
export class ResultsList {
  protected readonly facilityService = inject(FacilityService);
  facilities = input<Facility[]>([]);
  loading = input<boolean>(false);

  getAvailability(facility: Facility): string {
    return facility.availability;
  }
}
