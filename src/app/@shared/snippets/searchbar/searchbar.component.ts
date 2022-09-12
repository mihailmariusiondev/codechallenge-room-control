import { Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchBarComponent implements OnDestroy {
  @HostBinding('class') classList = 'mat-elevation-z0';

  @Input() title!: string;
  @Input() outline = false;

  @Input() includeSearchButton = true;
  @Input() includeRefreshButton = true;
  @Input() includeCreateButton = false;

  @Input() isLoading = false;
  @Input() isCreating = false;

  @Output() searchQueryEvent = new EventEmitter<string>();
  @Output() buttonRefreshEvent = new EventEmitter<null>();
  @Output() buttonCreateEvent = new EventEmitter<null>();

  searchQueryForm: FormControl = new FormControl('');
  searchQuery = '';
  searchSubscription: Subscription;

  isSearchToolbarVisible = false;

  @ViewChild('searchInput', { static: false })
  set searchInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  constructor() {
    this.searchSubscription = this.searchQueryForm.valueChanges.pipe(debounceTime(500)).subscribe((query) => {
      this.searchQueryEvent.emit(query);
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  toggleSearchToolbar() {
    this.isSearchToolbarVisible = !this.isSearchToolbarVisible;

    if (!this.isSearchToolbarVisible && this.searchQueryForm.value) {
      this.searchQueryForm.setValue('');
    }
  }

  onButtonRefreshPressed() {
    this.buttonRefreshEvent.emit();
  }

  onButtonCreatePressed() {
    this.buttonCreateEvent.emit();
  }
}
