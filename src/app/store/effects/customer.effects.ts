import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from  '@ngrx/effects';
import { CustomersService } from "../../services/customers.service";
import { CustomerModule } from "../actions/customer.action";
import { catchError, map, pipe, switchMap, tap } from "rxjs";

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


    loadDeleteCustomer = createEffect(() => this.actions$.pipe(
        ofType(CustomerModule.ActionTypes.LOAD_DELETE_CUSTOMER),
        switchMap((action: any) => this.customersService.deleteCustomer(action.payload)),
        map(result => new CustomerModule.SuccessDeleteCustomer(result.customer_id))
    ))

    constructor(
        private customersService: CustomersService, 
        private actions$: Actions
    ) {}
}