import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Facility, FacilityAvailability } from '../../models/facility';
import { FacilityCard } from '../facility-card/facility-card';
import { EmptyState } from '../empty-state/empty-state';

@Component({
  selector: 'app-results-list',
  standalone: true,
  imports: [CommonModule, FacilityCard, EmptyState],
  templateUrl: './results-list.html',
  styleUrl: './results-list.css',
})
export class ResultsList {
  @Input() facilities: Facility[] = [];
  @Input() availabilityOverrides: Record<string, FacilityAvailability> = {};

  getAvailability(facility: Facility): FacilityAvailability {
    return this.availabilityOverrides[facility.id] ?? facility.availability;
  }
}
