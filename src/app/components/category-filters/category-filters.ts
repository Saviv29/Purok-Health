import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';

interface CategoryOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-category-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filters.html',
  styleUrl: './category-filters.css',
})
export class CategoryFilters {
  @Output() select = new EventEmitter<string>();

  options: CategoryOption[] = [
    { label: 'Animal Bite Treatment', value: 'Animal Bite Treatment' },
    { label: 'Vaccinations', value: 'Vaccinations' },
    { label: 'Dialysis', value: 'Dialysis' },
    { label: 'TB DOTS', value: 'TB DOTS' },
    { label: 'X-Ray', value: 'X-Ray' },
  ];

  selected = signal<string | null>(null);

  onSelect(value: string) {
    const next = this.selected() === value ? null : value;
    this.selected.set(next);
    this.select.emit(next ?? '');
  }
}
