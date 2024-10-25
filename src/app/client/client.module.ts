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


@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    CarouselComponent,
    HomeComponent,
    FooterComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpClientModule,
    SharedModule
]
})
export class ClientModule { }
