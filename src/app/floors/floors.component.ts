import { Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
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
  selectedFloor: Floor = {
    id: 0,
    name: '',
    rooms: [],
  };
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

  onFloorChange(floor: MatOptionSelectionChange) {
    this.selectedFloor = floor.source.value;
    console.log(this.selectedFloor);
  }
}
