import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '@app/@shared/models/floor';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  @Input() room!: Room;
  @Input() isLoading!: boolean;

  @Output() public onRoomEvent = new EventEmitter<Room>();

  constructor() {}

  updateRoom(room: Room) {
    this.onRoomEvent.emit(room);
  }
}
