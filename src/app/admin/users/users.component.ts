import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { StorageService } from '../../helpers/storage.service';
import {
  ColDef,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  GridApi,
  GridReadyEvent
} from "ag-grid-community";
import { DateFormattingService } from '../../helpers/date-formatting.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AddEditUserDialogComponent } from '../dialogs/add-edit-user-dialog/add-edit-user-dialog.component';
import { NotificationService } from '../../helpers/notification.service';
import { CustomGridActionComponent } from '../custom-grid-action/custom-grid-action.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {
  type = 'usersComponent'
  private destroy$ = new Subject<void>();
  allUsers: any[] = [];
  gridApi!: GridApi;
  context = this;

  
  defaultColDef: ColDef = {
    width: 110,
    resizable: true,
    filter: true
  };

  colDefs: ColDef[] = [
    {
      headerName: 'Id',
      field: 'id',
      pinned: 'left',
    },
    {
      headerName: 'Username',
      field: 'username',
      pinned: 'left'
    },
    {
      headerName: 'Email',
      field: 'email'
    },
    {
      headerName: 'Birthdate',
      field: 'birth_date'
    },
    {
      headerName: 'Role',
      field: 'role.label'
    },
    {
      headerName: 'Gender',
      field: 'gender'
    },
    {
      headerName: 'Created At',
      field: 'created_at',
      cellRenderer: (params: any) => {
        return this.dateFormattingService.formatDateToTimestampString(params.node.data.created_at);
      }    
    },
    {
      headerName: 'Updated At',
      field: 'updated_at',
      cellRenderer: (params: any) => {
        return this.dateFormattingService.formatDateToTimestampString(params.node.data.updated_at);
      }    
    },
    {
      headerName: 'Action',
      cellRenderer: CustomGridActionComponent,
      pinned: 'right'
    }
  ]

  autoSizeStrategy: SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy | SizeColumnsToContentStrategy = {
    type: 'fitCellContents',
  }

  constructor(
    public usersService: UsersService,
    private dateFormattingService: DateFormattingService,
    private dialog: MatDialog,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {  }


  ngOnInit(): void {
    this.getAllUsers()

    this.usersService.refreshData.pipe(takeUntil(this.destroy$)).subscribe(
      _ => {
        this.getAllUsers()
      }
    )
  }

  private getAllUsers() {
    this.usersService.getAllUsers().pipe(takeUntil(this.destroy$)).subscribe(
      users => {
        this.allUsers = users;
      }
    )
  }

  addUser() {

    const ref = this.dialog.open(AddEditUserDialogComponent, {
      minWidth: '42vw',
      height: 'auto',
      data: {
        type: 'create'
      }
    })

    ref.afterClosed().subscribe(
      newUser => {
        if (newUser) {
          this.usersService.addUser(newUser).subscribe(
            result => {
              console.log(result); 
              this.notificationService.notify(`User was successffully created!`);
              this.usersService.refershUserList()
            }
          )
        }
      }
    )
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete()
  }
}
