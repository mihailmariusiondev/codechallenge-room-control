import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';

import { FloorsRoutingModule } from './floors-routing.module';
import { FloorsComponent } from './floors.component';
import { RoomComponent } from './components/room/room.component';
import { RoomDialogBoxComponent } from './components/room-dialog-box/room-dialog-box.component';
import { EditRoomDialogBoxComponent } from './components/edit-room-dialog-box/edit-room-dialog-box.component';

@NgModule({
  imports: [CommonModule, TranslateModule, FlexLayoutModule, SharedModule, MaterialModule, FloorsRoutingModule],
  declarations: [FloorsComponent, RoomComponent, RoomDialogBoxComponent, EditRoomDialogBoxComponent],
})
export class FloorsModule {}
