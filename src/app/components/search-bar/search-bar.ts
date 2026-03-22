import { Component, output, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar implements OnInit, OnDestroy {
  search = output<string>();

  query = '';
  private searchSubject = new Subject<string>();
  private subscription?: Subscription;

  ngOnInit() {
    this.subscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((val) => {
        this.search.emit(val);
      });
  }

  onInput() {
    this.searchSubject.next(this.query.trim());
  }

  onSubmit() {
    this.search.emit(this.query.trim());
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
