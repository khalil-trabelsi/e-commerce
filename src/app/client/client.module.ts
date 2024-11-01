import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { SharedModule } from "../shared/shared.module";
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ProductReviewsComponent } from './product/product-reviews/product-reviews.component';
import { AddProductReviewDialogComponent } from './product/add-product-review-dialog/add-product-review-dialog.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AddEditShippingAddressComponent } from './delivery/add-edit-shipping-address/add-edit-shipping-address.component';


@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    CarouselComponent,
    HomeComponent,
    FooterComponent,
    ProductComponent,
    CartComponent,
    ProductReviewsComponent,
    AddProductReviewDialogComponent,
    CartItemComponent,
    DeliveryComponent,
    AddEditShippingAddressComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpClientModule,
    SharedModule
]
})
export class ClientModule { }
