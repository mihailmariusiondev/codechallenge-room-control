import { Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FloorService } from '@app/@shared';
import { Floor } from '@app/@shared/models/floor';
import { finalize } from 'rxjs';
import { RoomDialogBoxComponent } from './components/room-dialog-box/room-dialog-box.component';

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

  constructor(private floorService: FloorService, private snackBar: MatSnackBar, public dialog: MatDialog) {}

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

  openDialog() {
    const dialogRef = this.dialog.open(RoomDialogBoxComponent, {
      width: '500px',
      height: '500px',
      data: { floor: this.selectedFloor },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
