import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastrComponent } from './toastr.component';
import { ToastrType } from '../models/toastrType';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  viewContainerRef!: ViewContainerRef;

  constructor() { }

  setRootContainerViewRef(vcr: ViewContainerRef) {
    this.viewContainerRef = vcr;
  }


  openToastr(message: string, type: ToastrType) {
    if (!this.viewContainerRef) {
      console.error('error while initializing toastr !')
      return;
    }

    const componentRef = this.viewContainerRef.createComponent(ToastrComponent);
    componentRef.instance.message = message;
    componentRef.instance.type = type;

    componentRef.changeDetectorRef.detectChanges();

    setTimeout(() => {
      componentRef.location.nativeElement.classList.add('ng-leave');
      setTimeout(() => {
        componentRef.destroy()
      }, 200)
  }, 5000);
  }




}
