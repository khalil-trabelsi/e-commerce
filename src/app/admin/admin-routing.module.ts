import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { StockMovementsComponent } from './stock-movements/stock-movements.component';
import { CollectionComponent } from './collection/collection.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'suppliers',
        component: SuppliersComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent
      },
   
      {
        path: 'brands',
        component: BrandsComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'stock-movements',
        component: StockMovementsComponent
      },
      {
        path: 'collections',
        component: CollectionComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
