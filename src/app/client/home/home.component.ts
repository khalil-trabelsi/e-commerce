import { Component } from '@angular/core';
import { BrandsService } from '../../admin/services/brands.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../admin/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  brands = toSignal(this.brandService.getAllBrands(), {initialValue: []})
  products = toSignal(this.productService.getProducts(), {initialValue: []})

  constructor(
    private brandService: BrandsService,
    private productService: ProductsService
  ) {}



}
