import { Customer } from "../../models/customer";

export namespace CustomerModule {
    export enum ActionTypes {
        LOAD_INIT_CUSTOMERS = '[Customers] Load Init Customers',
        SUCCESS_INIT_CUSTOMERS = '[Customers] Success Init Customers',
        LOAD_DELETE_CUSTOMER = '[Customers] Load Delete Customer',
        SUCCESS_DELETE_CUSTOMER = '[Customers] Success DELETE Customer',
        LOAD_CREATE_CUSTOMER = '[Customers] Load Create Customer',
        SUCCESS_CREATE_CUSTOMER = '[Customers] Success Create Customer',
        ERROR_LOAD_ACTION = '[matiereList] Error Load Action'
    }

    export class LoadInitCustomers {
        readonly type = ActionTypes.LOAD_INIT_CUSTOMERS;
    }

    export class SuccessInitCustomers {
        readonly type = ActionTypes.SUCCESS_INIT_CUSTOMERS;
        constructor(public payload: Customer[]) {}
    }

    export class LoadDeleteCustomer {
        readonly type = ActionTypes.LOAD_DELETE_CUSTOMER;
        constructor(public payload: number) {}
    }

    export class SuccessDeleteCustomer {
        readonly type = ActionTypes.SUCCESS_DELETE_CUSTOMER;
        constructor(public payload: number) {}
    }

    export class LoadCreatCustomer {
        readonly type = ActionTypes.LOAD_CREATE_CUSTOMER;
        constructor(public payload: Customer) {}
    }

    export class SuccessCreateCustomer {
        readonly type = ActionTypes.SUCCESS_CREATE_CUSTOMER;
        constructor(public payload: Customer) {}
    }

    export type Actions = LoadCreatCustomer | LoadDeleteCustomer | LoadInitCustomers | SuccessCreateCustomer | SuccessDeleteCustomer | SuccessInitCustomers;



}