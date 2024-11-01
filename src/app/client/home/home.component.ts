import { Component } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart';

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
    private productService: ProductsService,
    private cartService: CartService
  ) {}


  addToCart(item: CartItem) {
    this.cartService.addToCart(item)
  }


}
