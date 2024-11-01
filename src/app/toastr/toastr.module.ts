import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrContainerComponent } from './toastr-container/toastr-container.component';
import { ToastrComponent } from './toastr.component';



@NgModule({
  declarations: [
    ToastrContainerComponent,
    ToastrComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToastrContainerComponent
  ]
})
export class ToastrModule { }
