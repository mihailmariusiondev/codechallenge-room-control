import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '@app/@shared/models/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  @Input() room!: Room;
  @Input() isLoading!: boolean;

  @Output() public onRoomUpdateEvent = new EventEmitter<Room>();
  @Output() public onRoomDeleteEvent = new EventEmitter<Room>();

  constructor() {}

  updateRoom(room: Room) {
    this.onRoomUpdateEvent.emit(room);
  }

  deleteRoom(room: Room) {
    this.onRoomDeleteEvent.emit(room);
  }
}
