import { Component, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomersService } from '../../../services/customers.service';
import { NotificationService } from '../../../helpers/notification.service';
import { StorageService } from '../../../helpers/storage.service';
import { shippingAddress } from '../../../models/shippingAddress';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-edit-shipping-address',
  templateUrl: './add-edit-shipping-address.component.html',
  styleUrl: './add-edit-shipping-address.component.scss'
})
export class AddEditShippingAddressComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();


  shippingForm = this.fb.group(
    {
      street: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      postal: this.fb.control('', [Validators.required]),
      country: this.fb.control('', [Validators.required]),
    }
  )

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {type: string, shippingAddress?: shippingAddress},
    private dialogRef: MatDialogRef<AddEditShippingAddressComponent>,
    private fb: FormBuilder,
    private customersService: CustomersService,
    private notificationService: NotificationService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this.data.type === 'edit' && this.data.shippingAddress) {
      this.shippingForm.controls.street.setValue(this.data.shippingAddress.street!);
      this.shippingForm.controls.city.setValue(this.data.shippingAddress.city!);
      this.shippingForm.controls.postal.setValue(this.data.shippingAddress.postal!);
      this.shippingForm.controls.country.setValue(this.data.shippingAddress.country!);
    }

    console.log(this.data)

  }


  onSubmit(): void {
    const customerId = this.storageService.getUser().id;
    const address = {
      'city': this.shippingForm.value.city,
      'street': this.shippingForm.value.street,
      'postal': this.shippingForm.value.postal,
      'country': this.shippingForm.value.country,
    }
    if (this.data.type === 'create') {
      console.log(address)
      this.customersService.addShippingAddress({customer_id: customerId, ...address}).pipe(takeUntil(this.destroy$)).subscribe(
        data => {
          console.log(data)
          this.notificationService.notify('Votre nouvelle adresse a été enregistré avec succès!')
        }
      )
    } else {
      this.customersService.editShippingAddress(customerId, this.shippingForm.value).pipe(takeUntil(this.destroy$)).subscribe(
        _ => {
          this.notificationService.notify('Votre nouvelle adresse a été enregistré avec succès!')
        }
      )
    }


    this.dialogRef.close(
      true
    )
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
