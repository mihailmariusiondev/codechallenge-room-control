import { Component, OnInit } from '@angular/core';
import { FloorService } from '@app/@shared';
import { Floor } from '@app/@shared/models/floor';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss'],
})
export class FloorsComponent implements OnInit {
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
