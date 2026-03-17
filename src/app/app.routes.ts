import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { FacilityDetails } from './components/facility-details/facility-details';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'facility/:id', component: FacilityDetails },
  { path: '**', redirectTo: '' },
];
