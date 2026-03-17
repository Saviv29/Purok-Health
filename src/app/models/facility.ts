export type FacilityAvailability = 'available' | 'limited' | 'unavailable';

export interface FacilityLocation {
  city: string;
  province: string;
  latitude: number;
  longitude: number;
}

export interface Facility {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  location: FacilityLocation;
  services: string[];
  medicines: string[];
  availability: FacilityAvailability;
  type: 'hospital' | 'clinic' | 'barangay_health_center';
  operatingHours: string;
}
