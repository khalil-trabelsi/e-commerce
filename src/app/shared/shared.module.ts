import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteMultiselectComponent } from './autocomplete-multiselect/autocomplete-multiselect.component';
import { AgMaterialModule } from '../ag-material/ag-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressPipe } from '../custom-pipes/address.pipe';



@NgModule({
  declarations: [
    AutocompleteMultiselectComponent,
    AddressPipe
  ],
  imports: [
    CommonModule,
    AgMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    AutocompleteMultiselectComponent,
    AgMaterialModule,
    ReactiveFormsModule,
    AddressPipe

  ]
})
export class SharedModule { }
