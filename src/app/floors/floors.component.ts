import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Floor, RoomActions } from '@app/@shared/models/floor';
import { Room } from '@app/@shared/models/room';
import { RoomService } from '@app/@shared/api/room.service';
import { finalize } from 'rxjs';
import { RoomDialogBoxComponent } from './components/room-dialog-box/room-dialog-box.component';
import { FloorService } from '@app/@shared/api/floor.service';

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
  public readonly action: typeof RoomActions = RoomActions;

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

  openDialog(action: RoomActions, room?: Room) {
    const dialogRef = this.dialog.open(RoomDialogBoxComponent, {
      maxWidth: '500px',
      data: { floor: this.selectedFloor, room: room, action: action },
    });

    dialogRef.afterClosed().subscribe((event) => {
      if (event) {
        const _action: RoomActions = event.action;
        const _room: Room = event.room;
        if (_action == RoomActions.CREATE) {
          this.createRoom(_room);
        } else if (_action == RoomActions.UPDATE) {
          this.updateRoom(_room);
        } else if (_action == RoomActions.DELETE) {
          this.deleteRoom(_room);
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
    this.roomService
      .updateRoom(room)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.showSnackbar('Sala modificada con éxito');
        })
      )
      .subscribe((room: Room) => {
        this.rooms.map((r: Room, i) => {
          if (r.id == room.id) {
            r.name = room.name;
            r.maximum_capacity = room.maximum_capacity;
            r.occupancy = room.occupancy;
          }
        });
      });
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

  onSelectionFloorChange(floor: Floor) {
    this.selectedFloor = floor;
    this.getRoomsByFloorId(floor.id);
  }
}
