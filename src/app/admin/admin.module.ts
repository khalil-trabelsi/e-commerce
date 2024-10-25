import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AgMaterialModule } from '../ag-material/ag-material.module';
import { AddEditUserDialogComponent } from './dialogs/add-edit-user-dialog/add-edit-user-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AddEditSupplierDialogComponent } from './dialogs/add-edit-supplier-dialog/add-edit-supplier-dialog.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { BrandsComponent } from './brands/brands.component';
import { AddEditBrandDialogComponent } from './dialogs/add-edit-brand-dialog/add-edit-brand-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { AddEditCategoryDialogComponent } from './dialogs/add-edit-category-dialog/add-edit-category-dialog.component';
import { CustomersComponent } from './customers/customers.component';
import { AddEditProductDialogComponent } from './dialogs/add-edit-product-dialog/add-edit-product-dialog.component';
import { StockMovementsComponent } from './stock-movements/stock-movements.component';
import { AddEditStockEntryComponent } from './dialogs/add-edit-stock-entry/add-edit-stock-entry.component';
import { CollectionComponent } from './collection/collection.component';


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    AddEditUserDialogComponent,
    SuppliersComponent,
    AddEditSupplierDialogComponent,
    CategoriesComponent,
    ProductsComponent,
    BrandsComponent,
    AddEditBrandDialogComponent,
    AddEditCategoryDialogComponent,
    CustomersComponent,
    AddEditProductDialogComponent,
    StockMovementsComponent,
    AddEditStockEntryComponent,
    CollectionComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
