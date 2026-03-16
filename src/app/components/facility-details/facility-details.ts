import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { FacilityService } from '../../services/facility.service';

@Component({
  selector: 'app-facility-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './facility-details.html',
  styleUrl: './facility-details.css',
})
export class FacilityDetails {
  private readonly route = signal<ActivatedRoute | null>(null);
  private readonly router = signal<Router | null>(null);
  private readonly service = signal<FacilityService | null>(null);

  facilityId = signal('');

  facility = computed(() => {
    const service = this.service();
    const id = this.facilityId();
    return id && service ? service.getFacilityById(id)() : undefined;
  });

  constructor(route: ActivatedRoute, router: Router, service: FacilityService) {
    this.route.set(route);
    this.router.set(router);
    this.service.set(service);

    const id = route.snapshot.paramMap.get('id');
    if (id) {
      this.facilityId.set(id);
    }
  }

  backToSearch() {
    this.router()?.navigate(['/']);
  }
}
