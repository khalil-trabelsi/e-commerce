import { InjectionToken } from "@angular/core";
import { customersReducer, CustomersEntityState } from "./reducers/customer.reducer";
import { ActionReducerMap } from "@ngrx/store";
import { CustomerEffects } from "./effects/customer.effects";
import { OrderReducer, OrdersEntityState } from "./reducers/order.reducer";
import { OrderEffects } from "./effects/order.effects";

const  reducers = {
    customers: customersReducer,
    orders: OrderReducer
}

export interface AppState {
    customers: CustomersEntityState;
    orders: OrdersEntityState
}

export function getReducers() {
    return reducers;
}

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers');

export const appEffects = [CustomerEffects, OrderEffects]