import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FloorService } from '@app/@shared';
import { Floor, Room, RoomActions } from '@app/@shared/models/floor';
import { finalize } from 'rxjs';
import { AddRoomDialogBoxComponent } from './components/add-room-dialog-box/add-room-dialog-box.component';

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

  openDialog() {
    const dialogRef = this.dialog.open(AddRoomDialogBoxComponent, {
      width: '500px',
      height: '500px',
      data: { floor: this.selectedFloor },
    });

    dialogRef.afterClosed().subscribe(({ action, floor }: { action: string; floor: Floor }) => {
      console.log(floor);
      if (action == RoomActions.CREATE) {
        this.updateFloor(floor);
      } else if (action == RoomActions.UPDATE) {
        this.updateFloor(floor);
      } else if (action == RoomActions.DELETE) {
        this.deleteFloor(floor);
      }
    });
  }

  onRoomUpdate(room: Room) {
    console.log(room);
  }

  createRoom(room: Room) {
    this.isLoading = true;

    // this.userService.addUser(room).subscribe({
    //   next: (response) => {
    //     this.users = [...this.users, response];
    //     this.showSnackbar("Usuario AÑADIDO con éxito");
    //     this.isLoading = false;
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     this.showSnackbar("Error al AÑADIR user");
    //   },
    // });
  }

  updateFloor(floor: Floor) {
    this.floorService
      .updateFloors(floor)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((floors: Floor[]) => {
        this.floors = floors;
      });

    // this.isLoading = true;
    // this.userService.updateUser(room).subscribe({
    //   next: (response) => {
    //     this.users = this.users.filter((value, key) => {
    //       if (value.id == response.id) {
    //         value.name = response.name;
    //         value.email = response.email;
    //       }
    //       return true;
    //     });
    //     this.isLoading = false;
    //     this.showSnackbar("Usuario ACTUALIZADO con éxito");
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     this.showSnackbar("Error al ACTUALIZAR user");
    //   },
    // });
  }

  deleteFloor(floor: Floor) {
    // this.isLoading = true;
    // this.userService.deleteUser(room.id).subscribe({
    //   next: (response) => {
    //     this.users = this.users.filter((value, key) => {
    //       return value.id != room.id;
    //     });
    //     this.showSnackbar("Usuario ELIMINADO con éxito");
    //     this.isLoading = false;
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     this.showSnackbar("Error al ELIMINAR user");
    //   },
    // });
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2500,
    });
  }
}
