import { Component, OnDestroy, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { UsersService } from '../../services/users.service';
import { AddEditUserDialogComponent } from '../dialogs/add-edit-user-dialog/add-edit-user-dialog.component';
import { NotificationService } from '../../helpers/notification.service';
import { AddEditSupplierDialogComponent } from '../dialogs/add-edit-supplier-dialog/add-edit-supplier-dialog.component';
import { SuppliersService } from '../services/suppliers.service';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-custom-grid-action',
  templateUrl: './custom-grid-action.component.html',
  styleUrl: './custom-grid-action.component.scss'
})
export class CustomGridActionComponent implements ICellRendererAngularComp, OnDestroy {
  private destroy$ = new Subject<void>()
  currentRowData:any;
  parentComponent = signal('')
  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private suppliersService: SuppliersService,
    private notificationService: NotificationService
  ) {}
  agInit(params: ICellRendererParams): void {
    this.parentComponent.set(params.context.type);
    this.currentRowData = params.node.data;
  }
  refresh(params: ICellRendererParams) {
      return true;
  }
  editUser() {
    const refDialog = this.dialog.open(AddEditUserDialogComponent, {
      data: {
        type: 'edit',
        user: this.currentRowData
      },
      minWidth: '42vw',
      height: 'auto',
    })

    refDialog.afterClosed().pipe(
      filter(data => data),
      switchMap(data => this.usersService.updateUser(data, this.currentRowData.id)),
      takeUntil(this.destroy$)
    ).subscribe(
      _ => {
        this.usersService.refershUserList();
        this.notificationService.notify(`User with id ${this.currentRowData.id} was successfully updated`, 'Ok');
      }
    )
  }

  deleteUser() {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'This action will delete user permenantly !'
      }
    })

    ref.afterClosed().pipe(
      filter(result => result),
      switchMap(_ => this.usersService.deleteUser(this.currentRowData.id)), 
      takeUntil(this.destroy$)
    ).subscribe(
      _ => {
        this.usersService.refershUserList();
        this.notificationService.notify(`User #${this.currentRowData.id} was deleted!`);
      }
    )
  }


  editSupplier() {
    const dialogRef = this.dialog.open(AddEditSupplierDialogComponent, {
      width: '44vw',
      data: {
        type: 'edit',
        supplier: this.currentRowData
      }
    });

    dialogRef.afterClosed()
    .pipe(
      filter(result => result),
      switchMap(result=> this.suppliersService.editSupplier(this.currentRowData.id, result)),
      takeUntil(this.destroy$)
    ).subscribe(
      _ => {
        this.suppliersService.refreshSuppliersData();
        this.notificationService.notify(`Supplier with id  #${this.currentRowData.id} was updated!`); 
      }
    )

  }

  deleteSupplier() {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          message: `This action will delete Supplier #${this.currentRowData.id} permenantly!`
        }
      }
    )


    dialogRef.afterClosed().pipe
    ( filter(result => result),
      switchMap(_ => this.suppliersService.deleteSupplier(this.currentRowData.id)),
      takeUntil(this.destroy$)
    ).subscribe(
      _ => {
        this.notificationService.notify(`Supplier with id  #${this.currentRowData.id} was deleted!`);
        this.suppliersService.refreshSuppliersData();
      }
    )
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }

}
