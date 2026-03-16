import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Facility, FacilityAvailability } from '../../models/facility';
import { FacilityService } from '../../services/facility.service';

@Component({
  selector: 'app-status-mock-controller',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './status-mock-controller.html',
  styleUrl: './status-mock-controller.css',
})
export class StatusMockController {
  selectedFacilityId = '';
  selectedAvailability: FacilityAvailability = 'available';

  constructor(private readonly facilityService: FacilityService) {}

  get facilities(): Facility[] {
    return this.facilityService.facilities();
  }

  get currentOverride() {
    const id = this.selectedFacilityId;
    if (!id) return null;
    return this.facilityService.availabilityOverrides()[id] ?? null;
  }

  applyOverride() {
    const id = this.selectedFacilityId;
    if (!id) return;
    this.facilityService.setAvailabilityOverride(id, this.selectedAvailability);
  }

  clearOverride() {
    const id = this.selectedFacilityId;
    if (!id) return;
    this.facilityService.setAvailabilityOverride(
      id,
      this.facilityService.facilities().find((f) => f.id === id)?.availability ?? 'available'
    );
  }
}
