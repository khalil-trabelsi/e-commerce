import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserDialogComponent } from '../dialogs/add-edit-user-dialog/add-edit-user-dialog.component';
import { CustomersService } from '../services/customers.service';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../../helpers/notification.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  customers: any[] = []
  showDropdownMenu = signal(false)
  currentItemClicked = signal(-1)
  dropdownAtBottom = signal(false)
  constructor(
    private customersService: CustomersService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
      this.getCustomers();

      this.customersService.refreshCustomers.pipe(takeUntil(this.destroy$))
      .subscribe(
        _ => this.getCustomers()
      )
  }

  getCustomers() {
    this.customersService.getAllCustomers().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.customers = data
    )
  }

  addCustomer() {
    this.dialog.open(
      AddEditUserDialogComponent, {
        width: '45vw',
        data: {
          type: 'create'
        }
      }
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
