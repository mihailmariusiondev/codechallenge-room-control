import { Component, Input, OnInit } from '@angular/core';
import { Room } from '@app/@shared/models/floor';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @Input() room!: Room;
  @Input() isLoading!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
