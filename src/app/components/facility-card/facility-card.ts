import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Facility, FacilityAvailability } from '../../models/facility';

@Component({
  selector: 'app-facility-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './facility-card.html',
  styleUrl: './facility-card.css',
})
export class FacilityCard {
  @Input() facility!: Facility;
  @Input() availability: FacilityAvailability = 'available';

  get availabilityLabel() {
    switch (this.availability) {
      case 'available':
        return 'Available';
      case 'limited':
        return 'Limited';
      default:
        return 'Out of stock';
    }
  }

  get typeLabel() {
    switch (this.facility.type) {
      case 'hospital': return 'Hospital';
      case 'clinic': return 'Clinic';
      case 'barangay_health_center': return 'Health Center';
      default: return 'Facility';
    }
  }

  get typeBadgeClass() {
    switch (this.facility.type) {
      case 'hospital': return 'bg-indigo-100 text-indigo-700';
      case 'clinic': return 'bg-blue-100 text-blue-700';
      case 'barangay_health_center': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  }

  get badgeClasses() {
    switch (this.availability) {
      case 'available':
        return 'badge-available';
      case 'limited':
        return 'badge-warning';
      case 'unavailable':
        return 'badge-unavailable';
    }
  }
}
