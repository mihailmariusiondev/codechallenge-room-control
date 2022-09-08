import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Floor, RoomActions } from '@app/@shared/models/floor';

@Component({
  selector: 'app-add-room-dialog-box',
  templateUrl: './add-room-dialog-box.component.html',
  styleUrls: ['./add-room-dialog-box.component.scss'],
})
export class AddRoomDialogBoxComponent {
  floor!: Floor;
  roomForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddRoomDialogBoxComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.floor = data.floor;

    this.roomForm = this.formBuilder.group({
      id: [Date.now()],
      name: [null, [Validators.maxLength(100), Validators.required]],
      floor_id: [this.floor.id, [Validators.maxLength(100), Validators.required]],
      maximum_capacity: [null, [Validators.required]],
      occupancy: [null, [Validators.required]],
    });
  }

  createRoom() {
    this.dialogRef.close({ action: RoomActions.CREATE, room: this.roomForm.value });
  }
}
