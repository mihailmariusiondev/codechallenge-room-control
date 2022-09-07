import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';

import { FloorsRoutingModule } from './floors-routing.module';
import { FloorsComponent } from './floors.component';

@NgModule({
  imports: [CommonModule, TranslateModule, FlexLayoutModule, SharedModule, MaterialModule, FloorsRoutingModule],
  declarations: [FloorsComponent],
})
export class FloorsModule {}
