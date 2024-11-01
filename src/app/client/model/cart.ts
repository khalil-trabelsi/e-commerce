export interface Cart {
    cartItems: CartItem[];
}

export interface CartItem {
    product: any;
    quantity: number;
}