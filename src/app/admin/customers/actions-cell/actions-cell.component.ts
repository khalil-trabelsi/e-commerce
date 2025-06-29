import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AppState } from '../../../store/app.store';
import { CustomerModule } from '../../../store/actions/customer.action';

@Component({
  selector: 'app-actions-cell',
  template: `
    <button class="btn btn-danger" (click)="deleteCustomer(this.customerId)">
      <span class="material-symbols-outlined">
        delete
      </span>
    </button>
  `,
  styles: ``
})
export class ActionsCellComponent implements OnInit, ICellRendererAngularComp {
  customerId!: number;
  agInit(params: ICellRendererParams<any, any, any>): void {
      console.log(params)
      this.customerId = params.data.id
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
      return false;
  }

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
      
  }

  deleteCustomer(customerId: number) {
    this.store.dispatch(new CustomerModule.LoadDeleteCustomer(customerId))
  }
}
