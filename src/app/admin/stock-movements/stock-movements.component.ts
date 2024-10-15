import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditStockEntryComponent } from '../dialogs/add-edit-stock-entry/add-edit-stock-entry.component';
import { StockMovementsService } from '../services/stock-movements.service';

import {
  ColDef,
  GridReadyEvent,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  RowClassRules,
  GridApi
} from "ag-grid-community";
import { toSignal } from '@angular/core/rxjs-interop';
import { DateFormattingService } from '../../helpers/date-formatting.service';
import { Subject, take, takeUntil } from 'rxjs';
import { SuppliersService } from '../services/suppliers.service';
import { ProductsService } from '../services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock-movements',
  templateUrl: './stock-movements.component.html',
  styleUrl: './stock-movements.component.scss'
})
export class StockMovementsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  filterFormGroup: FormGroup = this.fb.group(
    {
      min_quantity: this.fb.control(0),
      max_quantity: this.fb.control(0),
      product_id: this.fb.control([]),
      supplier_id: this.fb.control([]),
    }
  );

  multiple = true;
  suppliers = toSignal(this.suppliersService.getSuppliers(), {initialValue: []});
  products = toSignal(this.productsService.getProducts(), {initialValue: []});

  selectedSuppliersId = [];
  selectedProductsId = [];


  stockMovements: any[] = []
  autoSizeStrategy: SizeColumnsToContentStrategy | SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy = {
    type: 'fitCellContents'
  }

  colDefs: ColDef[] = [
    {
      headerName: 'Id',
      field: 'id'
    },
    {
      headerName: 'Reference',
      field: 'reference'
    },
    {
      headerName: 'Type',
      field: 'movement_type'
    },
    {
      headerName: 'Product',
      field: 'product.name',
      cellRenderer: (p: any) => {
        return `<a href="#">${p.value}</a>`
      }
    },
    {
      headerName: 'Quantity',
      field: 'quantity'
    },
    {
      headerName: 'Supplier',
      field: 'supplier.name',
      cellRenderer: (p: any) => {
        return `<a href="#">${p.value}</a>`
      }
    },
    {
      headerName: 'Modified by',
      field: 'modified_by',
      cellRenderer: (p:any) => {
        return `${p.value.first_name} ${p.value.last_name}`
      }
    }, 
    {
      headerName: 'Modified at',
      field: 'date',
      valueFormatter: p => {
        return this.dateFormattingService.formatDateToTimestampString(p.value)
      }
    },
    {
      headerName: 'Comment',
      field: 'comment'
    }

  ]

  constructor(
    private dialog: MatDialog,
    private stockMovementsService: StockMovementsService,
    private dateFormattingService: DateFormattingService,
    private suppliersService: SuppliersService,
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
      this.getStockMovements()
      this.stockMovementsService.refreshStockMovements$.pipe(takeUntil(this.destroy$)).subscribe(
        _ => this.getStockMovements()
      )
  }

  addStockEntry() {
    this.dialog.open(AddEditStockEntryComponent);
  }

  getRowClass(params: any) {
    console.log(params.node.data)
    if (params.node.data.movement_type === 'entry') {
      return 'grid-row-entry-style'
  }
    return 'grid-row-out-style'
  }

  public rowClassRules: RowClassRules = {
    "grid-row-entry-style": (params) => {
      return params.node.data.movement_type === 'entry';
    },
    "grid-row-default-style": (params) => {
      return params.rowIndex % 2 !== 0;
    },
  };

  getStockMovements(filters: any = null) {
    this.stockMovementsService.getStockMovements(filters).pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.stockMovements = data
        console.log(data)
      }
    )
  }

  getSelectedOptions(result: any) {
    switch(result.type) {
      case 'suppliers': {
        this.filterFormGroup.controls['supplier_id'].setValue(result.selectedOptions)
        break;
      }

      case 'products': {
        this.filterFormGroup.controls['product_id'].setValue(result.selectedOptions)
        break;
      }

      default: {
        break;
      }
    }
  }

  filterStockMovementsData() {
    console.log(this.filterFormGroup.value)
    this.getStockMovements(this.filterFormGroup.value)
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();;
  }
}
