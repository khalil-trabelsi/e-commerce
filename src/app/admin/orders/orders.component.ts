import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/app.store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectOrdersEntities$ } from '../../store/selectors/orders.selector';
import { OrderModule } from '../../store/actions/order.action';
import {
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  Params,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
} from "ag-grid-community";
import { CustomerOrder } from '../../models/customer-order';
import { DateFormattingService } from '../../helpers/date-formatting.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()
  
  orders$!: Observable<CustomerOrder[]>;
  orders: CustomerOrder[] = [];

  colDefs: ColDef[] = [
    { field: 'id', headerName: '#' },
    { field: "customer", headerName: 'Client', valueFormatter: p => `${p.value.first_name} ${p.value.last_name}` },
    { field: "total_amount", headerName: 'Total amount', valueFormatter: p => '£' + (p.value / 100) },
    { field: "created_at", headerName: 'Date de commande', valueFormatter: p => this.dateFormatter.formatDateToTimestampString(new Date(p.value))  },
    { field: 'payment_status', headerName: 'Payment', cellRenderer: (p: any) =>  
      p.data.payment_status == 'fulfilled' ?
      `<span class="text-success material-symbols-outlined">check_circle</span>` 
      : `<span style='font-size: 1.5rem;' class="text-danger material-symbols-outlined">cancel</span>` 

    }

  ]
  autoSizeStrategy: | SizeColumnsToFitGridStrategy
        | SizeColumnsToFitProvidedWidthStrategy
        | SizeColumnsToContentStrategy = {type: 'fitGridWidth'};
 
  constructor(
    private store: Store<AppState>,
    private dateFormatter: DateFormattingService,
  ) {
    this.store.pipe(select(selectOrdersEntities$)).subscribe(
      data => this.orders = data
    );
  }

  ngOnInit(): void {
      this.store.dispatch(new OrderModule.LoadInitOrders());
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete()
  }

}
