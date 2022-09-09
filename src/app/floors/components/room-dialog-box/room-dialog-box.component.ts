import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Floor, RoomActions } from '@app/@shared/models/floor';
import { Room } from '@app/@shared/models/room';

@Component({
  selector: 'app-room-dialog-box',
  templateUrl: './room-dialog-box.component.html',
  styleUrls: ['./room-dialog-box.component.scss'],
})
export class RoomDialogBoxComponent {
  floor!: Floor;
  room!: Room;
  roomForm: FormGroup;
  action: RoomActions;
  checkActionEnum = RoomActions;

  constructor(
    public dialogRef: MatDialogRef<RoomDialogBoxComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.floor = data.floor;
    this.room = data.room;
    this.action = data.action;

    this.roomForm = this.formBuilder.group({
      id: [this.room.id || Date.now()],
      name: [null, [Validators.maxLength(100), Validators.required]],
      floor_id: [this.floor.id, [Validators.maxLength(100), Validators.required]],
      maximum_capacity: [null, [Validators.required]],
      occupancy: [null, [Validators.required]],
    });
  }

  doAction() {
    switch (this.action) {
      case RoomActions.CREATE:
        this.dialogRef.close({ action: RoomActions.CREATE, room: this.roomForm.value as Room });
        break;
      case RoomActions.UPDATE:
        this.dialogRef.close({ action: RoomActions.UPDATE, room: this.roomForm.value as Room });
        break;
      case RoomActions.DELETE:
        this.dialogRef.close({ action: RoomActions.DELETE, room: this.room });
        break;
    }
  }
}
