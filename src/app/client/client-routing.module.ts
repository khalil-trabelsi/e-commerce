import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { authGuard } from '../helpers/auth-guard';

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
        path: 'checkout/delivery', component: DeliveryComponent,
        canMatch: [authGuard],
        data: {roles: ['USER']},
      },
      {
        path: 'ref/:id',
        component: ProductComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
