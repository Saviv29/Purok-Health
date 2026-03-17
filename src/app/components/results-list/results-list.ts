import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';

import { Facility } from '../../models/facility';
import { FacilityService } from '../../services/facility.service';
import { FacilityCard } from '../facility-card/facility-card';
import { EmptyState } from '../empty-state/empty-state';
import { LoadingSkeleton } from '../loading-skeleton/loading-skeleton';

@Component({
  selector: 'app-results-list',
  standalone: true,
  imports: [CommonModule, FacilityCard, EmptyState, LoadingSkeleton],
  templateUrl: './results-list.html',
  styleUrl: './results-list.css',
})
export class ResultsList {
  protected readonly facilityService = inject(FacilityService);
  @Input() facilities: Facility[] = [];
  @Input() loading = false;

  getAvailability(facility: Facility): string {
    return facility.availability;
  }
}
