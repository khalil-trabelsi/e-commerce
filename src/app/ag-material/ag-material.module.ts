import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    AgGridModule,
    MatTooltipModule,
    MatSelectModule
  ],
  exports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    AgGridModule,
    MatTooltipModule,
    MatSelectModule
  ]
})
export class AgMaterialModule { }
