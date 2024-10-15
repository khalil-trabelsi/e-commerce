import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ColDef,
  GridReadyEvent,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  RowClassRules,
  GridApi
} from "ag-grid-community";
import { BrandsService } from '../services/brands.service';
import { Brand } from '../models/brands';
import { MatDialog } from '@angular/material/dialog';
import { AddEditBrandDialogComponent } from '../dialogs/add-edit-brand-dialog/add-edit-brand-dialog.component';
import { NotificationService } from '../../helpers/notification.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  gridApi!: GridApi;
  brands!: Brand[];
  autoSizeStrategy: SizeColumnsToContentStrategy | SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy = {
    type: 'fitCellContents',
  }

  rowClassRules = ""
  context: any = "";
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
      headerName: 'Description',
      field: 'description'
    }
  ]

  constructor(
    private brandService: BrandsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
      this.getBrands();

      this.brandService.refreshBrands.pipe(takeUntil(this.destroy$)).subscribe(
        _ => this.getBrands()
      )
  }

  getRowClass(params: any) {
    if (params.node.rowIndex % 2 === 0) {
      return 'grid-row-style'
    }
    return 'grid-row-default-style'
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  getBrands() {
    this.brandService.getAllBrands().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.brands = data
    )
  }

  addBrand() {
    const dialogRef = this.dialog.open(AddEditBrandDialogComponent, {
      width: '42vw',
      minHeight: '16vh',
      data: {
        type: 'create'
      }
    })

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(
      brand => {
        if (brand) {
          this.brandService.addBrand(brand).pipe(takeUntil(this.destroy$)).subscribe(
            _ => {
              this.brandService.refreshBrandData();
              this.notificationService.notify('Brand added successfully');
            }
          )
        }
      }
    )
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
