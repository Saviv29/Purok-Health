import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { FacilityDetails } from './components/facility-details/facility-details';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Home },
  { path: 'facility/:id', component: FacilityDetails },
  { path: '**', redirectTo: '' },
];
