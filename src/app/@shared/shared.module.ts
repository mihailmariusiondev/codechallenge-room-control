import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './snippets/searchbar/searchbar.component';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, TranslateModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [LoaderComponent, SearchBarComponent],
  exports: [LoaderComponent, FormsModule, ReactiveFormsModule, SearchBarComponent],
})
export class SharedModule {}
