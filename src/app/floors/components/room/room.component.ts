import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Room } from '@app/@shared/models/room';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  formGroupRoom!: FormGroup;
  @Input() room!: Room;
  @Input() isLoading!: boolean;

  @Output() public updateButtonEvent = new EventEmitter<Room>();
  @Output() public formControlEvent = new EventEmitter<Room>();
  @Output() public deleteButtonEvent = new EventEmitter<Room>();

  constructor() {}

  ngOnInit() {
    this.formGroupRoom = new FormBuilder().group({
      id: new FormControl(this.room?.id),
      floor_id: new FormControl(this.room?.floor_id),
      name: new FormControl(this.room?.name),
      maximum_capacity: new FormControl(this.room?.maximum_capacity, Validators.minLength(2)),
      occupancy: new FormControl(this.room?.occupancy, Validators.minLength(2)),
    });

    this.formGroupRoom.valueChanges.pipe(takeUntil(this.destroy$), debounceTime(1000)).subscribe(() => {
      this.formControlEvent.emit(this.formGroupRoom.value as Room);
    });
  }

  updateRoom(room: Room) {
    this.updateButtonEvent.emit(room);
  }

  deleteRoom(room: Room) {
    this.deleteButtonEvent.emit(room);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
