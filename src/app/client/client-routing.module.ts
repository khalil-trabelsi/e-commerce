import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { authGuard } from '../helpers/auth-guard';
import { CustomerOrderComponent } from './account/customer-order/customer-order.component';
import { AccountComponent } from './account/account.component';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import { userPaymentDetailResolver } from './resolvers/user-payment-detail.resolver';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';

const routes: Routes = [
  {
    path: '', 
    component: ClientComponent,
    children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'checkout/cart', component: CartComponent,
      },
      {
        path: 'account', 
        component: AccountComponent,
        canMatch: [authGuard],
        data: {roles: ['USER']},
        children: [
          {
            path: 'orders',
            component: CustomerOrderComponent
          },
        ]
      },
      {
        path: 'checkout/delivery', component: DeliveryComponent,
        canMatch: [authGuard],
        data: {roles: ['USER']},
      },
      {
        path: 'checkout/payment/:id', component: OrderPaymentComponent,
        canMatch: [authGuard],
        data: {roles: ['USER']},
        resolve: {
          userDetail: userPaymentDetailResolver
        }
      },
      {
        path: 'ref/:id',
        component: ProductComponent,
      },
      {
        path: 'success',
        component: SuccessPaymentComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
