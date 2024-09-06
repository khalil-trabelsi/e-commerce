import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { UsersService } from '../../services/users.service';
import { AddEditUserDialogComponent } from '../dialogs/add-edit-user-dialog/add-edit-user-dialog.component';
import { NotificationService } from '../../helpers/notification.service';

@Component({
  selector: 'app-custom-grid-action',
  templateUrl: './custom-grid-action.component.html',
  styleUrl: './custom-grid-action.component.scss'
})
export class CustomGridActionComponent implements ICellRendererAngularComp {
  currentRow:any;
  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private notificationService: NotificationService
  ) {}
  agInit(params: ICellRendererParams): void {
    this.currentRow = params.node.data;
  }
  refresh(params: ICellRendererParams) {
      return true;
  }
  edit() {
    const refDialog = this.dialog.open(AddEditUserDialogComponent, {
      data: {
        type: 'update',
        user: this.currentRow
      },
      minWidth: '42vw',
      height: 'auto',
    })

    refDialog.afterClosed().subscribe(
      userData => {
        if(userData) {
          this.usersService.updateUser(userData, this.currentRow.id)
          .subscribe(
            result => {
              if (result) {
                this.usersService.refershUserList();
                this.notificationService.notify(`User with id ${this.currentRow.id} was successfully updated`, 'Ok')
              }
            }
          )
        }
      }
    )
  }

  delete() {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'This action will delete user permenantly !'
      }
    })

    ref.afterClosed().subscribe(
      result => {
        if (result) {
          this.usersService.deleteUser(this.currentRow.id).subscribe(
            () => {
              this.usersService.refershUserList();
              this.notificationService.notify(`User #${this.currentRow.id} was deleted`);
            }
          )
        }
      }
    )
  }

}
