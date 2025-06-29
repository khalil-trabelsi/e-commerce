import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserDialogComponent } from '../dialogs/add-edit-user-dialog/add-edit-user-dialog.component';
import { CustomersService } from '../../services/customers.service';
import { filter, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { NotificationService } from '../../helpers/notification.service';
import { Customer } from '../../models/customer';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddEditCustomerComponent } from '../dialogs/add-edit-customer/add-edit-customer.component';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from '../../toastr/toastr.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/app.store';
import { selectCustomersEntitiesConverted$, selectCustomersLoading$ } from '../../store/selectors/customer.selector';
import { CustomerModule } from '../../store/actions/customer.action';
import { ColDef, SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community';
import { ActionsCellComponent } from './actions-cell/actions-cell.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit, AfterViewInit,OnDestroy {
  private destroy$ = new Subject<void>();
  
  customers$!: Observable<Customer[]>;
  customersLoading$!: Observable<boolean>;
  
  autoSizeStrategy: SizeColumnsToContentStrategy | SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy = {
      type: 'fitGridWidth'
    }

  colDefs: ColDef[] = [
    {
      headerName: 'Id',
      field: 'id'
    },
    {
      headerName: 'first name',
      field: 'first_name'
    },
        {
      headerName: 'last name',
      field: 'last_name'
    },
    {
      headerName: 'email',
      field: 'email'
    },
    {
      headerName: 'gender',
      field: 'gender'
    },
    {
      headerName: 'status',
      field: 'status'
    },
        {
      headerName: 'Actions',
      cellRenderer: ActionsCellComponent
    },
  ]

  defaultColDef: ColDef = {
    sortable: true,
    filter: true
  }

  showDropdownMenu = signal(false)
  currentItemClicked = signal(-1)
  dropdownAtBottom = signal(false)

  displayedColumns = ['id', 'first_name', 'last_name', 'email', 'gender', 'status', 'actions']
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Customer>()

  constructor(
    private customersService: CustomersService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private toastrService: ToastrService,
    private store: Store<AppState>
  ) {
    this.customers$ = store.pipe(select(selectCustomersEntitiesConverted$));
    this.customersLoading$ = store.pipe(select(selectCustomersLoading$))
  }
 
  ngOnInit(): void {
      this.store.dispatch(new CustomerModule.LoadInitCustomers());

      this.customers$.pipe(takeUntil(this.destroy$)).subscribe(
        data => {
          console.log(data.length);
          this.dataSource.data = data
        }
      )
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }


  addCustomer() {
    const dialogRef = this.dialog.open( 
      AddEditCustomerComponent, {
        width: '45vw',
        data: {
          type: 'create'
        }
      }
    )

    dialogRef.afterClosed().pipe(
      filter(user => !!user),
      map(new_user => this.store.dispatch(new CustomerModule.LoadCreatCustomer(new_user))), 
      takeUntil(this.destroy$)
    ).subscribe(
      _ =>  this.toastrService.openToastr('Customer successfully created', 'success')
    )

  }

  showUserAction(index: number, event: Event) {
    event.stopPropagation()
    this.currentItemClicked.set(index)
    this.showDropdownMenu.update(
      value => !value
    )
  }

  editCustomer(customer: any) {
    this.dialog.open(
      AddEditUserDialogComponent, {
        width: '45vw',
        data: {
          type: 'edit',
          user: customer
        }
      }
    )
  }

  deactivateCustomer(customerId: number) {
    this.customersService.deactivateCustomer(customerId).pipe(takeUntil(this.destroy$)).subscribe(
      _ => {
        this.customersService.refreshCustomersData();
        this.notificationService.notify(`Customer #${customerId} was deactivated!`)
      }
    )
  }

  banCustomer(customerId: number) {
    this.customersService.banCustomer(customerId).pipe(takeUntil(this.destroy$)).subscribe(
      _ => {
        this.customersService.refreshCustomersData();
        this.notificationService.notify(`Customer #${customerId} has been banned!`)
      }
    )
  }

  activeCustomer(customerId: number) {
    this.customersService.activeCustomer(customerId).pipe(takeUntil(this.destroy$)).subscribe(
      _ => {
        this.customersService.refreshCustomersData();
        this.notificationService.notify(`Customer #${customerId} is actived!`)
      }
    )
  }

  @HostListener('document:click', ['$event'])
  closeDropDown(event: Event) {
    if (!event.target || !(event.target as HTMLElement).closest('.dropdown')) {
      this.showDropdownMenu.set(false);
      this.currentItemClicked.set(-1);
    }
  }

  scroll(event: any) {
    const element = event.target 
    console.log(element.scrollHeight-element.scrollTop)
    this.dropdownAtBottom.set(element.scrollHeight-element.scrollTop <= element.clientHeight)
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
