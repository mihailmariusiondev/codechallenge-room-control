import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Floor, RoomActions } from '@app/@shared/models/floor';
import { Room } from '@app/@shared/models/room';
import * as _ from 'lodash';

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

    this.roomForm = new FormBuilder().group({
      id: new FormControl(this.room?.id || Date.now()),
      floor_id: new FormControl(this.floor?.id),
      name: new FormControl(this.room?.name, [Validators.required, Validators.maxLength(25)]),
      maximum_capacity: new FormControl(this.room?.maximum_capacity, [Validators.required, Validators.max(99)]),
      occupancy: new FormControl(this.room?.occupancy, [Validators.required, Validators.max(99)]),
    });
  }

  doAction() {
    switch (this.action) {
      case RoomActions.CREATE:
        this.dialogRef.close({ action: RoomActions.CREATE, room: this.roomForm.value as Room });
        break;
      case RoomActions.UPDATE:
        const roomPrevNextEqual = _.isEqual(
          _.omit(_.omit(this.room, ['id', 'floor_id'])),
          _.omit(_.omit(this.roomForm.value as Room, ['id', 'floor_id']))
        );

        if (!roomPrevNextEqual) {
          this.dialogRef.close({ action: RoomActions.UPDATE, room: this.roomForm.value as Room });
        }
        break;
      case RoomActions.DELETE:
        this.dialogRef.close({ action: RoomActions.DELETE, room: this.room });
        break;
    }
  }
}
