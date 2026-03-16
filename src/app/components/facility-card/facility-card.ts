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
