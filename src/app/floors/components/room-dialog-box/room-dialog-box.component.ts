import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-room-dialog-box',
  templateUrl: './room-dialog-box.component.html',
  styleUrls: ['./room-dialog-box.component.scss'],
})
export class RoomDialogBoxComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<RoomDialogBoxComponent>) {}

  ngOnInit(): void {}
}
