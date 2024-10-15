import { Component, OnDestroy, OnInit } from '@angular/core';
import { Supplier } from '../models/Supplier';
import { SuppliersService } from '../services/suppliers.service';
import { map, Subject, takeUntil } from 'rxjs';
import {
  ColDef,
  GridReadyEvent,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  RowClassRules,
  GridApi
} from "ag-grid-community";
import { DateFormattingService } from '../../helpers/date-formatting.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditSupplierDialogComponent } from '../dialogs/add-edit-supplier-dialog/add-edit-supplier-dialog.component';
import { NotificationService } from '../../helpers/notification.service';
import { CustomGridActionComponent } from '../custom-grid-action/custom-grid-action.component';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss'
})
export class SuppliersComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    suppliers: Supplier[] = [];
    private gridApi!: GridApi;
    type = 'suppliersComponent'
    context = this;

    autoSizeStrategy: SizeColumnsToContentStrategy | SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy = {
      type: 'fitCellContents'
    }

    colDefs: ColDef[] = [
      {
        headerName: 'Id',
        field: 'id',
        pinned: 'left'
      },
      {
        headerName: 'Name',
        field: 'name',
        pinned: 'left'
      },
      {
        headerName: 'Contact Name',
        field: 'contact_name'
      },
      {
        headerName: 'address',
        field: 'address'
      },
      {
        headerName: 'city',
        field: 'city'
      },
      {
        headerName: 'zipcode',
        field: 'zipcode'
      },
      {
        headerName: 'country',
        field: 'country'
      },
      {
        headerName: 'Created At',
        field: 'created_at',
        valueFormatter: params => this.dateFormattingService.formatDateToTimestampString(params.value)
      },
      {
        headerName: 'Updated At',
        field: 'updated_at',
        valueFormatter: params => this.dateFormattingService.formatDateToTimestampString(params.value)
      },
      {
        headerName: 'Action',
        cellRenderer: CustomGridActionComponent,
        pinned: 'right'
      }
    ]

    constructor(
      private suppliersService: SuppliersService,
      private dateFormattingService: DateFormattingService,
      private dialog: MatDialog,
      private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.getAllSuppliers();

        this.suppliersService.refresh$.subscribe(
          _ => this.getAllSuppliers()
        )
    }


    onGridReady(params: GridReadyEvent) {
      this.gridApi = params.api;
    }
    
    getAllSuppliers() {
      this.suppliersService.getSuppliers().pipe(takeUntil(this.destroy$)).subscribe(
        data => this.suppliers = data
      )
    }

    getRowClass(params: any) {
      console.log(params.node.rowIndex)
      console.log(params.node.data)
      if (params.node.rowIndex % 2 === 0) {
        return 'grid-row-style'
    }
      return 'grid-row-default-style'
    }


    addSupplier() {
      const refDialog = this.dialog.open(AddEditSupplierDialogComponent, {
        width: '48vw',
        height: 'auto',
        data: {
          type: 'create',
        }
      })

      refDialog.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(
        result => {
          if (result) {
            this.suppliersService.addSupplier(result).pipe(takeUntil(this.destroy$)).subscribe(
              _ => {
                this.suppliersService.refreshSuppliersData();
                this.notificationService.notify('Supplier was created successfully!')
              }
            )
          }
        } 
      )
    }

    applyRowStyles(parmas: any) {
      parmas.api.forEach
    }
    public rowClassRules: RowClassRules = {
      "grid-row-style": (params) => {
        return params.rowIndex % 2 === 0;
      },
      "grid-row-default-style": (params) => {
        return params.rowIndex % 2 !== 0;
      },
    };


    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

}
