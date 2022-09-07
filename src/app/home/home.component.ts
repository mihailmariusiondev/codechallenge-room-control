import { Component, OnInit } from '@angular/core';
import { FloorService } from '@app/@shared';
import { Floor } from '@app/@shared/models/floor';
import { finalize } from 'rxjs/operators';

// import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  floors: Floor[] = [];
  isLoading = false;

  constructor(private floorService: FloorService) {}

  ngOnInit() {
    this.isLoading = true;
    this.floorService
      .getFloors()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((floors: Floor[]) => {
        this.floors = floors;
      });
  }
}
