import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductDialogComponent } from '../dialogs/add-edit-product-dialog/add-edit-product-dialog.component';
import { ProductsService } from '../services/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ColDef,SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community'
import { Subject, switchMap, take, takeUntil } from 'rxjs';
import { DateFormattingService } from '../../helpers/date-formatting.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()

  products: any[] = []
  autoSizeStrategy: SizeColumnsToContentStrategy | SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy = {
    type: 'fitCellContents'
  }  



  colDefs: ColDef[] = [
    {
      headerName: 'Id',
      field: 'id'
    },
    {
      headerName: 'Name',
      field: 'name'
    },
    {
      headerName: 'Brand',
      field: 'brand.name',
      cellRenderer: (p: any) => {
        return `<a href="#" target='_blank'>${p.value}</a>`
      }
    }
    ,
    {
      headerName: 'Category',
      field: 'category.name',
      cellRenderer: (p: any) => {
        return `<a href="#" target='_blank'>${p.value}</a>`
      }
    },
    {
      headerName: 'Price Ht ($)',
      field: 'price_ht'
    },
    {
      headerName: 'Tva (%)',
      field: 'tva'
    },
    {
      headerName: 'Price ($)',
      field: 'price',
    },
    {
      headerName: 'Created At',
      field: 'created_at',
      valueFormatter: p => this.dateFormattingService.formatDateToTimestampString(p.value)
    },
    {
      headerName: 'Status',
      field: 'available',
      cellRenderer: (params: any) => {
        return params.value ? 'In stock' : 'Out of stock'
      },
      cellClass: params => {
         if (params.value) {
          return ['bg-success', 'text-light']
         } else {
          return ['bg-danger', 'text-light']
         }
      }
    },
    {
      headerName: 'Stock',
      field: 'stock'
    },
    
  ]

  constructor(
    private dialog: MatDialog,
    private productsService: ProductsService,
    private dateFormattingService: DateFormattingService
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.productsService.refreshProductsData$.pipe(takeUntil(this.destroy$))
    .subscribe(
      () => this.loadProducts()
    )
  }

  addProduct() {
    this.dialog.open(
      AddEditProductDialogComponent, {
        width: '45vw',
        minHeight: '22vh'
      }
    )
  }


  loadProducts() {
    this.productsService.getProducts().pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
