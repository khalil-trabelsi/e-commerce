import { CustomerOrder } from "../../models/customer-order";

export namespace OrderModule {
    export enum ActionTypes {
        LOAD_INIT_ORDERS = "[Orders] Load Init Orders",
        SUCCESS_INIT_ORDERS = "[Orders] Success Init Orders",
        LOAD_CREATE_ORDER = "[Orders] Init Create Order",
        SUCCESS_CREATE_ORDER = "[Orders] Success Create Order",
    }    

    export class LoadInitOrders {
        readonly type = ActionTypes.LOAD_INIT_ORDERS;
    }

    export class SuccessInitOrders {
        readonly type = ActionTypes.SUCCESS_INIT_ORDERS;
        constructor(public payload: CustomerOrder[]) {}
    }

    export class LoadCreateOrder {
        readonly type = ActionTypes.LOAD_CREATE_ORDER;
        constructor(public payload: CustomerOrder) {}
    }
    
    export class SuccessCreateOrder {
        readonly type = ActionTypes.SUCCESS_CREATE_ORDER;
        constructor(public payload: CustomerOrder) {}
    }
    export type Actions = LoadInitOrders | SuccessInitOrders |  LoadCreateOrder  | SuccessCreateOrder
}

