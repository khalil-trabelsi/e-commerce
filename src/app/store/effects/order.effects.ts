import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { OrderModule } from "../actions/order.action";
import { map, switchMap, tap } from "rxjs";
import { CustomerOrderService } from "../../services/customer-order.service";

@Injectable()
export class OrderEffects {
    loadOrders$ = createEffect(() => this.actions$.pipe(
        ofType(OrderModule.ActionTypes.LOAD_INIT_ORDERS),
        switchMap(_ => this.ordersService.getAllOrders()),
        tap(orders => console.log(orders)),
        map(orders => new OrderModule.SuccessInitOrders(orders))
    ))

    constructor(
        private actions$: Actions,
        private ordersService: CustomerOrderService
    ) {}
}
