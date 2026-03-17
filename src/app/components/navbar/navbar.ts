import { CommonModule } from '@angular/common';
import { signal, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }
}
