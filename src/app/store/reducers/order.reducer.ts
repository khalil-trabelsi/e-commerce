import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { CustomerOrder } from "../../models/customer-order";
import { OrderModule } from "../actions/order.action";

export interface OrdersEntityState extends EntityState<CustomerOrder> {
    loading: boolean;
    loaded: boolean;
}

export const OrderAdapter = createEntityAdapter<CustomerOrder>({
    sortComparer: false
})

export const initialState = OrderAdapter.getInitialState({
    loading: false,
    loaded: false
})

export const {
    selectIds: selectOrdersIds,
    selectEntities: selectOrdersEntities,
    selectAll: selectOrders,
    selectTotal: selectOrdersTotal
} = OrderAdapter.getSelectors()


export function OrderReducer(state = initialState, action: OrderModule.Actions): OrdersEntityState {
    switch (action.type) {
        case OrderModule.ActionTypes.LOAD_INIT_ORDERS: 
            return {
                ...state,
                loading: true
            };

        case OrderModule.ActionTypes.SUCCESS_INIT_ORDERS: 
            return {
                ...OrderAdapter.addMany(action.payload, state),
                loading: false,
                loaded: true
            };
      case OrderModule.ActionTypes.LOAD_CREATE_ORDER: 
            return {
                ...state,
                loading: true,
            };

      case OrderModule.ActionTypes.SUCCESS_CREATE_ORDER: 
            console.log('add new order to store')
            return {
                ...OrderAdapter.addOne(action.payload, state),
                loading: false,
            };
        default: {
            return state;
        }
    }
}