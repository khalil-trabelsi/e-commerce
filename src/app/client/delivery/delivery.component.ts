import { Component, computed, effect, inject, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddEditShippingAddressComponent } from './add-edit-shipping-address/add-edit-shipping-address.component';
import { CustomersService } from '../../admin/services/customers.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { StorageService } from '../../helpers/storage.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  cartService = inject(CartService);
  customersService = inject(CustomersService);
  storageService = inject(StorageService);
  dialog = inject(MatDialog);


  username = this.storageService.getCurrentUsername()
  shippingFormControl = new FormControl('standard')
  showProductDetails = signal(false);

  productsNumber = this.cartService.cartItemsTotal;
  totalPrice = computed(()=> (this.cartService.totalPrice() + 7.99).toFixed(2));

  cartItems = this.cartService.cartItems
  cartItemEditable = false;

  customerShippingAddress = signal({})
  customerShippingAddressValid = computed(() => {
    return Object.keys(this.customerShippingAddress()).length > 0
  })

  ngOnInit(): void {
    this.updateShippingAddress()
  }


  showHideProductDetails() {
    this.showProductDetails.update(isHidden => !isHidden)
  }

  addShippingAddress(): void {
    this.dialog.open(AddEditShippingAddressComponent, {
      width: '42vw',
      data: {
        type: 'create'
      }
    })
  }
  private updateShippingAddress() {
    this.customersService.getShippingAddressByCustomerId(this.storageService.getUser().id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(address => {
        this.customerShippingAddress.set(address);
      });
  }
  editShippingAddress(): void {
    const dialogRef = this.dialog.open(AddEditShippingAddressComponent, {
      width: '42vw',
      data: {
        type: 'edit',
        shippingAddress: this.customerShippingAddress()
      }
    })
  dialogRef.afterClosed().subscribe(
    result => {
      if (result) {
        this.updateShippingAddress()
      }
    }
  )
  
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

 
}
