import { Component, computed } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  editable = true

  cartItemsNumber = this.cartService.cartItemsTotal;
  cartItems = this.cartService.cartItems;
  subTotal = this.cartService.totalPrice;
  totalPrice = computed(()=> (this.subTotal() + 7.99).toFixed(2));

  constructor(
    private cartService: CartService
  ) {}
}
