import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteMultiselectComponent } from './autocomplete-multiselect/autocomplete-multiselect.component';
import { AgGridModule } from 'ag-grid-angular';
import { AgMaterialModule } from '../ag-material/ag-material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AutocompleteMultiselectComponent
  ],
  imports: [
    CommonModule,
    AgMaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    AutocompleteMultiselectComponent,
    AgMaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
