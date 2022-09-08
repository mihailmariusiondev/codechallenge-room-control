import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Floor } from '@app/@shared/models/floor';

@Component({
  selector: 'app-room-dialog-box',
  templateUrl: './room-dialog-box.component.html',
  styleUrls: ['./room-dialog-box.component.scss'],
})
export class RoomDialogBoxComponent implements OnInit {
  floor!: Floor;
  // roomForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RoomDialogBoxComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Floor
  ) {
    this.floor = data;

    // this.roomForm = this.formBuilder.group({
    //   name: [null, [Validators.maxLength(100), Validators.required]],
    //   email: [null,[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    // });
  }

  ngOnInit(): void {}
}
