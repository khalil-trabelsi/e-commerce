import { User } from "./user";

export interface Customer extends User {
    shipping_address: any;
}