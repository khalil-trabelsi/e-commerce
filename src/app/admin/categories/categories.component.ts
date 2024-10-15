import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../models/category';
import {
  ColDef,
  GridReadyEvent,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  RowClassRules,
  GridApi
} from "ag-grid-community";
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryDialogComponent } from '../dialogs/add-edit-category-dialog/add-edit-category-dialog.component';
import { filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { NotificationService } from '../../helpers/notification.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();

  multiple = false;
  categories!: Category[];
  context = this;
  autoSizeStrategy: SizeColumnsToContentStrategy | SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy = {
    type: 'fitCellContents'
  }
  colDefs: ColDef[] = [
    {
      headerName: 'Id',
      field: 'id'
    },
    {
      headerName: 'name',
      field: 'name'
    },
    {
      headerName: 'description',
      field: 'id'
    },
    {
      headerName: 'Category Parent',
      field: 'parent_id'
    },
  ]

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
      this.getCategories();

      this.categoriesService.refreshCategories.pipe(takeUntil(this.destroy$)).subscribe(
        _ => {
          this.getCategories()
        }
      )
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddEditCategoryDialogComponent, {
      width: '42vw',
      data: {
        type: 'create',
      }
    })

    dialogRef.afterClosed()
    .pipe(
      filter(result => result), 
      switchMap(result => this.categoriesService.addCategory(result)),
      takeUntil(this.destroy$)
    ).subscribe(
      result => {
        this.categoriesService.refreshCategoriesData();
        this.notificationService.notify(`Category with ${result.id} added successffully!`)
      }
    )
  }

  onGridReady(params: GridReadyEvent) {

  }

  getRowClass(params: any) {
    if (params.node.rowIndex % 2 === 0) {
      return 'grid-row-style'
    }
    return 'grid-row-default-style'
  }

  getCategories() {
    this.categoriesService.getAllCategories().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.categories = data
    )
  }

  getSelectedOptions(event: any) {
    console.log(event)
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete()
  }
}
