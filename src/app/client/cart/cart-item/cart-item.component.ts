import { Component, computed, effect, inject, input, InputSignal, Signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cart';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  item: InputSignal<CartItem> = input.required()
  editable: InputSignal<boolean> = input.required()
  itemMainImage = computed(()=> this.item().product.images.find((image: any) => image.image_url))

  cartService = inject(CartService);

  quantity = new FormControl(0)

  onRemove() {
    this.cartService.removeFromCart(this.item())
  }

  constructor() {
    effect(()=> {
      if (this.item()) {
        this.quantity.setValue(this.item().quantity)
      }
    })
  }

  updateProductQuantity() {
    this.cartService.addToCart({product: this.item().product, quantity: this.quantity.value!})
  }


}
