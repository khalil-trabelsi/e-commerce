import { createSelector } from "@ngrx/store";
import { AppState } from "../app.store";

import * as fromOrders from '../reducers/order.reducer'

export const selectOrdersState$ = (state: AppState) => state.orders;

export const selectOrdersEntities$ = createSelector(selectOrdersState$, fromOrders.selectOrders);