import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductDialogComponent } from '../dialogs/add-edit-product-dialog/add-edit-product-dialog.component';
import { ProductsService } from '../services/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ColDef,SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community'
import { Subject, switchMap, take, takeUntil } from 'rxjs';
import { DateFormattingService } from '../../helpers/date-formatting.service';
import { CollectionService } from '../services/collection.service';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '../../helpers/notification.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

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
      headerName: 'Description',
      field: 'description'
    },
  ]

  collections: any[] = [];

  addCollectionForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  })

  constructor(
    private collectionService: CollectionService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
      this.getCollections();

      this.collectionService.refreshCollectionData$.pipe(takeUntil(this.destroy$)).subscribe(
        _ => this.getCollections()
      )
  }

  addCollection(): void {
    this.collectionService.addCollection(this.addCollectionForm.value).pipe(takeUntil(this.destroy$)).subscribe(
      _ => {
        this.collectionService.refreshData();
        this.notificationService.notify('Collection added successfully!');
        this.addCollectionForm.reset()
      }
    )
  }

  getCollections() {
    this.collectionService.getCollections().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.collections = data
    )
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
