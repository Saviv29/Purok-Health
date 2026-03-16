import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { computed, signal, Signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Facility } from '../models/facility';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  private readonly http = inject(HttpClient);

  private readonly facilitiesSignal = signal<Facility[]>([]);

  private readonly availabilityOverrideSignal = signal<Record<string, Facility['availability']>>({});

  constructor() {
    this.loadFacilities();
  }

  private loadFacilities() {
    this.http
      .get<Facility[]>('assets/mock-facilities.json')
      .subscribe((data) => this.facilitiesSignal.set(data));
  }

  get facilities(): Signal<Facility[]> {
    return this.facilitiesSignal;
  }

  get availabilityOverrides(): Signal<Record<string, Facility['availability']>> {
    return this.availabilityOverrideSignal;
  }

  /**
   * Returns the facility list with optional filter by query and category.
   */
  search(query: string, category?: string): Signal<Facility[]> {
    return computed(() => {
      const raw = this.facilitiesSignal();
      if (!query && !category) {
        return raw;
      }

      const lowerQuery = query.trim().toLowerCase();
      const lowerCategory = category?.trim().toLowerCase();

      return raw.filter((facility) => {
        const matchesCategory = lowerCategory
          ? facility.services.some((s) => s.toLowerCase().includes(lowerCategory)) ||
            facility.medicines.some((m) => m.toLowerCase().includes(lowerCategory))
          : true;

        const matchesQuery = lowerQuery
          ? facility.services.some((s) => s.toLowerCase().includes(lowerQuery)) ||
            facility.medicines.some((m) => m.toLowerCase().includes(lowerQuery)) ||
            facility.name.toLowerCase().includes(lowerQuery)
          : true;

        return matchesCategory && matchesQuery;
      });
    });
  }

  getFacilityById(id: string): Signal<Facility | undefined> {
    return computed(() => this.facilitiesSignal().find((f) => f.id === id));
  }

  setAvailabilityOverride(facilityId: string, availability: Facility['availability']) {
    this.availabilityOverrideSignal.update((state) => ({
      ...state,
      [facilityId]: availability,
    }));
  }

  getAvailability(facility: Facility): Facility['availability'] {
    return this.availabilityOverrideSignal()[facility.id] ?? facility.availability;
  }
}
