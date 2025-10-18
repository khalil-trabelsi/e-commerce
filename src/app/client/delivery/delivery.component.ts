import { Component, computed, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddEditShippingAddressComponent } from './add-edit-shipping-address/add-edit-shipping-address.component';
import { CustomersService } from '../../services/customers.service';
import { StorageService } from '../../helpers/storage.service';
import { filter, map, Subject, switchMap, take, takeUntil } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomerOrderService } from '../../services/customer-order.service';
import { CustomerOrderLine } from '../../models/customer-order';
import { shippingAddress } from '../../models/shippingAddress';
import { NotificationService } from '../../helpers/notification.service';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  cartService = inject(CartService);
  customersService = inject(CustomersService);
  customerOrder = inject(CustomerOrderService)
  storageService = inject(StorageService);
  dialog = inject(MatDialog);
  router = inject(Router)
  clientService = inject(ClientService)
  
  private customerId = this.storageService.getUser().id;
  deliveryCost = signal(3.99);


  username = this.storageService.getCurrentUsername()
  shippingFormControl = new FormControl('standard')
  shippingFormValue = toSignal(this.shippingFormControl.valueChanges, {initialValue: 'standard'})
  showProductDetails = signal(false);

  productsNumber = this.cartService.cartItemsTotal;
  totalPrice = computed(()=>  {
    let totalAmount = this.cartService.totalPrice() + Number(this.getDeliveryCost(this.shippingFormValue()!));
    console.log(totalAmount.toFixed(2))
    return Number(totalAmount.toFixed(2))
  }
   
);

  cartItems = this.cartService.cartItems
  cartItemEditable = false;

  customerShippingAddress: WritableSignal<shippingAddress> = signal({})
  customerShippingAddressValid = computed(() => {
    return this.customerShippingAddress() ? Object.keys(this.customerShippingAddress()).length > 0 : false;
  })

  ngOnInit(): void {
    this.updateShippingAddress();
    this.shippingFormControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(
      deliveryType => {
        this.deliveryCost.set(this.getDeliveryCost(deliveryType!))
      }
    )
  }


  showHideProductDetails() {
    this.showProductDetails.update(isHidden => !isHidden)
  }

  addShippingAddress(): void {
    const dialogRef = this.dialog.open(AddEditShippingAddressComponent, {
      width: '42vw',
      data: {
        type: 'create'
      }
    })

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$),filter(addressCreated => addressCreated))
    .subscribe(
      _ => this.updateShippingAddress()
    )
  }

  private updateShippingAddress() {
    this.customersService.getShippingAddressByCustomerId(this.customerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(addressList => {
        const currentAddress = addressList.find(elt => elt.is_active)
        this.customerShippingAddress.set(currentAddress);
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
  dialogRef.afterClosed()
  .pipe(takeUntil(this.destroy$))
  .subscribe(
    result => {
      if (result) {
        this.updateShippingAddress()
      }
    }
  )
  
  }

  createCheckoutSession() {

    const userEmail = this.storageService.getCurrentUserEmail();

    let customerOrderLines: CustomerOrderLine[] = [];
    console.log(this.cartItems())
    customerOrderLines = this.cartItems().map(cartItem =>  {
      return {
        product_id: cartItem.product.id,
        quantity: cartItem.quantity,
        unit_price: cartItem.product.price,
        subtotal: cartItem.quantity * cartItem.product.price,
      } 
  })

    const shippingAddress = `${this.customerShippingAddress().street} ${this.customerShippingAddress().city} ${this.customerShippingAddress().postal} ${this.customerShippingAddress().country}`
    const orderData = {
      customer_id: this.customerId, 
      total_amount: this.totalPrice(), 
      shipping_address: shippingAddress, 
      order_lines: customerOrderLines
    }
    

    this.customerOrder.saveOrder(orderData).pipe(
      takeUntil(this.destroy$),
      switchMap(order => this.customerOrder.createStripeCheckoutSession({
        amount: Number((this.totalPrice() * 100).toFixed(2)), 
        currency: 'eur', 
        metadata: {'order_id': order.id},
        email: userEmail
      }))
    ).subscribe(
      response => {
        window.location.href = response.checkout_url;
      }
    )
  }


  private getDeliveryCost(type: string) {
    return type === 'standard' ? 3.99 : 9.99;
  }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
}
 
}
