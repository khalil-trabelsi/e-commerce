import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AgMaterialModule } from '../ag-material/ag-material.module';
import { AddEditUserDialogComponent } from './dialogs/add-edit-user-dialog/add-edit-user-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    AddEditUserDialogComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AgMaterialModule
  ]
})
export class AdminModule { }
