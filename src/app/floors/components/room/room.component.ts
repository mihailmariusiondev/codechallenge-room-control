import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  maximum_capacity: FormControl = new FormControl(null, Validators.required);
  occupancy: FormControl = new FormControl(null, Validators.required);

  constructor() {
    this.maximum_capacity.valueChanges.subscribe((value) => {
      console.log('maximum_capacity has changed:', value);
    });
    this.occupancy.valueChanges.subscribe((value) => {
      console.log('occupancy has changed:', value);
    });
  }

  updateRoom(room: Room) {
    this.onRoomUpdateEvent.emit(room);
  }

  deleteRoom(room: Room) {
    console.log(this.maximum_capacity.value);
    console.log(this.occupancy.value);
    // this.onRoomDeleteEvent.emit(room);
  }
}
