import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { StorageService } from '../../helpers/storage.service';
import { EMPTY, mergeMap, of } from 'rxjs';

export const userPaymentDetailResolver: ResolveFn<any> = (route, state) => {
  const customersService = inject(CustomersService);
  const storageService = inject(StorageService);
  const router = inject(Router);

  const currentUser = storageService.getUser();
  const userId = currentUser.id;
  const username = `${currentUser.first_name} ${currentUser.last_name}`
  const email = currentUser.email

  return customersService.getShippingAddressByCustomerId(userId).pipe(
    mergeMap((shippingAddress: any) => {
      if (shippingAddress) {      
        const userPaymentDetail = {username, shippingAddress}
        return of(userPaymentDetail)
      }
      else {
        router.navigate(['/'])
        return EMPTY
      }
    })
  )


};
