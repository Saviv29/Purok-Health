import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-skeleton.html',
  styleUrl: './loading-skeleton.css',
})
export class LoadingSkeleton {}
