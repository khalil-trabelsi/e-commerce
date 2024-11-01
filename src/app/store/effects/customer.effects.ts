import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from  '@ngrx/effects';
import { CustomersService } from "../../services/customers.service";
import { CustomerModule } from "../actions/customer.action";
import { catchError, map, switchMap, tap } from "rxjs";

@Injectable()
export class CustomerEffects {

    loadCustomers$ = createEffect(() => this.actions$.pipe(
        ofType(CustomerModule.ActionTypes.LOAD_INIT_CUSTOMERS),
        switchMap(action => this.customersService.getAllCustomers()),
        map(customers => new CustomerModule.SuccessInitCustomers(customers)),
    )) 

    loadCreateCustomer = createEffect(() => this.actions$.pipe(
        ofType(CustomerModule.ActionTypes.LOAD_CREATE_CUSTOMER),
        switchMap((action: any) => this.customersService.addCustomer(action.payload)),
        tap(newUser => console.log(newUser)),
        map(newUser => new CustomerModule.SuccessCreateCustomer(newUser))
    ) )

    constructor(
        private customersService: CustomersService, 
        private actions$: Actions
    ) {}
}