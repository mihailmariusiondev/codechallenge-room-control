import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FloorService } from '@app/@shared';
import { Floor, RoomActions } from '@app/@shared/models/floor';
import { Room } from '@app/@shared/models/room';
import { RoomService } from '@app/@shared/room.service';
import { finalize } from 'rxjs';
import { AddRoomDialogBoxComponent } from './components/add-room-dialog-box/add-room-dialog-box.component';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss'],
})
export class FloorsComponent implements OnInit {
  floors: Floor[] = [];
  rooms: Room[] = [];
  selectedFloor!: Floor;
  isLoading = false;

  constructor(
    private floorService: FloorService,
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getFloors();
  }

  getFloors() {
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

  getRoomsByFloorId(id: number) {
    this.isLoading = true;
    this.roomService
      .getRoomsByFloorId(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      });
  }

  onSelectionFloorChange(floor: Floor) {
    this.selectedFloor = floor;
    this.getRoomsByFloorId(floor.id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddRoomDialogBoxComponent, {
      width: '500px',
      height: '500px',
      data: { floor: this.selectedFloor },
    });

    dialogRef.afterClosed().subscribe((event) => {
      if (event) {
        const _action: RoomActions = event.action;
        const _room: Room = event.room;
        if (_action == RoomActions.CREATE) {
          this.createRoom(_room);
        }
      }
    });
  }

  createRoom(room: Room) {
    this.roomService
      .createRoom(room)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.showSnackbar('Sala agregada con éxito');
        })
      )
      .subscribe((room: Room) => {
        this.rooms.push(room);
      });
  }

  updateRoom(room: Room) {
    console.log(room);
  }

  deleteRoom(room: Room) {
    this.roomService
      .deleteRoom(room.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.showSnackbar('Sala eliminada con éxito');
        })
      )
      .subscribe((response: any) => {
        this.rooms = this.rooms.filter((x) => x.id !== room.id);
      });
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2500,
    });
  }
}
