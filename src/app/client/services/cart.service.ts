import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>(this.loadCartFromLocalStorage())

  cartItemsTotal = computed(()=> this.cartItems().length)
  totalPrice = computed(() => this.cartItems().reduce((total, item)=> total + item.quantity * item.product.price, 0))

  constructor() { 
    effect(()=> {
      this.saveCartToLocalStorage()
    })
  }


  get items() {
    return this.cartItems()
  }
  
  addToCart(cartItem: CartItem) {
    const existingItem = this.cartItems().find(item => item.product.id === cartItem.product.id);
    if (existingItem) {
      existingItem.quantity = cartItem.quantity;
      this.cartItems.update(items => [...items])
    } else {
      this.cartItems.update(items => [...items, cartItem])
    }
  }

  private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }  

  saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }


  removeFromCart(cartItem: CartItem) {
    this.cartItems.update(items => items.filter(item => item.product.id !== cartItem.product.id))
  }


}
