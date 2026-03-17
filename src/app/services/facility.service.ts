import { inject, Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, Unsubscribe, query } from '@angular/fire/firestore';
import { computed, signal, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Facility } from '../models/facility';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  private readonly firestore = inject(Firestore);
  private readonly facilitiesCollection = collection(this.firestore, 'facilities');

  // Search state
  readonly searchQuery = signal('');
  readonly selectedCategory = signal('');

  // Facilities raw signal from Firestore
  // Manual observable using onSnapshot to avoid collectionData type issues
  private readonly facilitiesRaw = toSignal(
    new Observable<Facility[]>((subscriber) => {
      console.log('FacilityService: Setting up Firestore listener...');
      // Wrapping with query() often fixes the "Expected type '_Query'" error
      const unsubscribe: Unsubscribe = onSnapshot(
        query(this.facilitiesCollection),
        (snapshot) => {
          const facilities = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Facility)
          );
          console.log(`FacilityService: ${facilities.length} facilities synced`);
          subscriber.next(facilities);
        },
        (error) => {
          console.error('FacilityService: Firestore listener error:', error);
          subscriber.error(error);
        }
      );

      return () => {
        console.log('FacilityService: Unsubscribing from Firestore');
        unsubscribe();
      };
    }),
    { initialValue: undefined }
  );

  // Loading state: true until the first emission from Firestore
  readonly isLoading = computed(() => this.facilitiesRaw() === undefined);

  // Computed signal for filtered results
  readonly facilities = computed(() => {
    const raw = this.facilitiesRaw() || [];
    const filterText = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory().toLowerCase().trim();

    if (!filterText && !category) {
      return raw;
    }

    return raw.filter((f) => {
      const name = (f.name || '').toLowerCase();
      const city = (f.location?.city || '').toLowerCase();
      const services = (f.services || []).map((s) => s.toLowerCase());
      const medicines = (f.medicines || []).map((m) => m.toLowerCase());
      const type = (f.type || '').toLowerCase();

      const matchesQuery =
        !filterText ||
        name.includes(filterText) ||
        city.includes(filterText) ||
        services.some((s) => s.includes(filterText)) ||
        medicines.some((m) => m.includes(filterText));

      const matchesCategory =
        !category ||
        type.includes(category) ||
        services.some((s) => s.includes(category)) ||
        medicines.some((m) => m.includes(category));

      return matchesQuery && matchesCategory;
    });
  });

  setSearch(query: string) {
    this.searchQuery.set(query);
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  getFacilityById(id: string): Signal<Facility | undefined> {
    return computed(() => this.facilities().find((f) => f.id === id));
  }
}
