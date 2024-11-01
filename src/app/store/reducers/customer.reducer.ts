import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Customer } from "../../models/customer";
import { CustomerModule } from "../actions/customer.action";

export interface CustomersEntityState extends EntityState<Customer> {
    loading: boolean;
    loaded: boolean;
    selectCustomer: Customer | null | undefined;
}

export const CustomerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>({
    sortComparer: false
})

export const initialState: CustomersEntityState = CustomerAdapter.getInitialState({
    loaded: false,
    loading: false,
    selectCustomer: undefined
})

export const {
    selectIds: selectCustomersIds,
    selectEntities: selectCustomersEntities,
    selectAll: selectCustomers,
    selectTotal: selectTotalCustomers
} = CustomerAdapter.getSelectors();

export function customersReducer(state = initialState, action: CustomerModule.Actions): CustomersEntityState  {

    switch (action.type) {
        case CustomerModule.ActionTypes.LOAD_INIT_CUSTOMERS: 
            return {
                ...state,
                loading: true
            };

        case CustomerModule.ActionTypes.SUCCESS_INIT_CUSTOMERS: 
        console.log(state)
            return {
                ...CustomerAdapter.addMany(action.payload, state),
                loading: false,
                loaded: true
            };
            
        case CustomerModule.ActionTypes.LOAD_CREATE_CUSTOMER:
            return {
                ...state,
                loading: true
            }
        case CustomerModule.ActionTypes.SUCCESS_CREATE_CUSTOMER:
            console.log(action.payload)
            return {
                ...CustomerAdapter.addOne(action.payload, state),
                loading: false
            }   

        case CustomerModule.ActionTypes.LOAD_DELETE_CUSTOMER:
            return {
                ...state,
                loading: true
            }  

        case CustomerModule.ActionTypes.SUCCESS_DELETE_CUSTOMER:
            return {
                ...CustomerAdapter.removeOne(action.payload, state),
                loading: false
            }                 
        default:
            return state    
    }
    
}