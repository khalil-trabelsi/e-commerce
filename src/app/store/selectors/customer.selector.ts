import { createSelector } from "@ngrx/store";
import { AppState } from "../app.store";

import * as fromCustomers from '../reducers/customer.reducer'

export const selectCustomerState$ = (state: AppState) => state.customers;

export const selectCustomersLoading$ = createSelector(selectCustomerState$, (customers) => customers.loading);

export const selectCustomersLoaded$ = createSelector(selectCustomerState$, (customers) => customers.loaded);

export const selectCustomersEntitiesConverted$ = createSelector(selectCustomerState$, fromCustomers.selectCustomers);