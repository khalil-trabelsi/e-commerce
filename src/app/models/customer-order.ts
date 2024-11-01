export interface CustomerOrder {
    id?: number;
    customer_id: number;
    date?: Date;
    shipping_status?: string;
    payment_status?: string;
    total_amount: number;
    shipping_address: string;
    created_at?: Date;
    modified_at?: Date;
    customer?: {
        id: number,
        email: string,
        first_name: string,
        last_name: string
    }

    order_lines: Array<CustomerOrderLine> | string
  
}


export interface CustomerOrderLine  {
    id?: number,
    product_id: number,
    customer_order_id?: number,
    quantity: number,
    unit_price: number,
    subtotal: number
}