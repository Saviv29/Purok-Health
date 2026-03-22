import { inject, Component, computed, signal, AfterViewInit, PLATFORM_ID, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { FacilityService } from '../../services/facility.service';
import { Facility } from '../../models/facility';

@Component({
  selector: 'app-facility-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './facility-details.html',
  styleUrl: './facility-details.css',
})
export class FacilityDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly facilityService = inject(FacilityService);
  private readonly platformId = inject(PLATFORM_ID);

  facilityId = signal('');

  facility = computed(() => {
    const id = this.facilityId();
    return id ? this.facilityService.getFacilityById(id)() : undefined;
  });

  private map: any;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.facilityId.set(id);
    }

    // Effect to initialize/update map when facility is available
    effect(() => {
      const f = this.facility();
      if (f && isPlatformBrowser(this.platformId)) {
        this.initMap(f);
      }
    });
  }

  private initMap(facility: Facility) {
    // Small timeout to ensure container is rendered
    setTimeout(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      // Import Leaflet dynamically to avoid SSR issues
      import('leaflet').then((L) => {
        if (this.map) {
          this.map.remove();
        }

        const coords: [number, number] = [facility.location.latitude, facility.location.longitude];
        this.map = L.map('map-container').setView(coords, 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(this.map);

        L.marker(coords)
          .addTo(this.map)
          .bindPopup(facility.name)
          .openPopup();
      });
    }, 100);
  }

  backToSearch() {
    this.router.navigate(['/']);
  }
}
