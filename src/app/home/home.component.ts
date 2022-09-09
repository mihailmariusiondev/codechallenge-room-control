import { Component } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { Room } from '@app/@shared/models/room';
import { RoomService } from '@app/@shared/room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  thisIsMyForm: FormGroup;
  rooms: Room[] = [];

  constructor(private formBuilder: FormBuilder, private roomService: RoomService) {
    this.thisIsMyForm = new FormGroup({
      formArrayName: this.formBuilder.array([]),
    });
    this.getRoomsByFloorId(1);
  }

  getRoomsByFloorId(id: number) {
    this.roomService.getRoomsByFloorId(id).subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      this.buildForm();
    });
  }

  buildForm() {
    const controlArray = this.thisIsMyForm.get('formArrayName') as FormArray;

    Object.keys(this.rooms).forEach((i) => {
      controlArray.push(
        this.formBuilder.group({
          name: new FormControl({ value: this.rooms[i].name, disabled: true }),
          type: new FormControl({ value: this.rooms[i].type, disabled: true }),
        })
      );
    });
  }

  toggleEdit(i: any) {
    const controlArray = this.thisIsMyForm.get('formArrayName') as FormArray;
    if (controlArray.controls[i].status === 'DISABLED') {
      controlArray.controls[i].enable();
    } else {
      controlArray.controls[i].disable();
    }
  }

  formControlState(i: number) {
    const controlArray = this.thisIsMyForm.get('formArrayName') as FormArray;
    return controlArray.controls[i].disabled;
  }

  onSubmit() {
    console.log(this.thisIsMyForm.value);
  }
}
