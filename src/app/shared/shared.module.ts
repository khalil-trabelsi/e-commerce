import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteMultiselectComponent } from './autocomplete-multiselect/autocomplete-multiselect.component';
import { AgMaterialModule } from '../ag-material/ag-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressPipe } from '../custom-pipes/address.pipe';
import { StripePaymentElementComponent } from 'ngx-stripe';
import { MatTableModule } from "@angular/material/table"
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AutocompleteMultiselectComponent,
    AddressPipe
  ],
  imports: [
    CommonModule,
    AgMaterialModule,
    ReactiveFormsModule,
    StripePaymentElementComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatListModule
    ],
  exports: [
    AutocompleteMultiselectComponent,
    AgMaterialModule,
    ReactiveFormsModule,
    AddressPipe,
    StripePaymentElementComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatListModule
  ]
})
export class SharedModule { }
