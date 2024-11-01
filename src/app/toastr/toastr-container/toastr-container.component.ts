import { AfterViewInit, Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastrService } from '../toastr.service';

@Component({
  selector: 'app-toastr-container',
  template: `<ng-template #toastContainer></ng-template>`,
})
export class ToastrContainerComponent implements AfterViewInit {

  toastrService = inject(ToastrService);

  @ViewChild('toastContainer', { read: ViewContainerRef, static: true }) vcr!: ViewContainerRef;
  

  ngAfterViewInit(): void {
    this.toastrService.setRootContainerViewRef(this.vcr);
  }

}
