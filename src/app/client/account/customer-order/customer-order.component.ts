import { Component } from '@angular/core';
import { ColDef,SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community'
import { CustomerOrderService } from '../../../services/customer-order.service';
import { StorageService } from '../../../helpers/storage.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DateFormattingService } from '../../../helpers/date-formatting.service';



@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.scss'
})
export class CustomerOrderComponent {
  autoSizeStrategy: SizeColumnsToContentStrategy | SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy = {
    type: 'fitCellContents'
  }
  customerId = this.storageService.getUser().id;

  orders = toSignal(this.customerOrderService.getOrdersByCustomerId(this.customerId), {initialValue: []} ) 

  colDefs: ColDef[] = [
    {
      headerName: '#Id',
      field: 'id'
    },
    {
      headerName: 'Date',
      field: 'date',
      valueFormatter: p => this.dateFormattingService.formatDateToTimestampString(p.value)

    },
    {
      headerName: 'Adresse de livraison',
      field: 'shipping_address',
    },
    {
      headerName: 'Montant',
      field: 'total_amount'
    },
    {
      headerName: 'Status de livraison',
      field: 'shipping_status',
      cellRenderer: (p: any) => {
        console.log(p.value)
        return p.value === 'processing' ? '<p class="alert-warning">En cours de préparation</p>' :''
      }
    },
    {
      headerName: 'Status de paiement',
      field: 'payment_status'
    },
  ]

  constructor(
    private storageService: StorageService,
    private dateFormattingService: DateFormattingService,
    private customerOrderService: CustomerOrderService,
  ) {}


  getRowClass(params: any) {
    if (params.node.rowIndex % 2 === 0) {
      return 'grid-row-style'
    }
    return 'grid-row-default-style'
  }
}
