import React, { Reducer, useReducer } from 'react'
import { Action, OrderProps, OrdersReducer } from './OrdersReducer';
// TODO
type OrdersContextProps={
    orders:OrderProps[],
    addOrder:(order:OrderProps)=>void,
    removeOrder:(id:number)=>void,
    changeOrder:(order:OrderProps)=>void,
    populateOrdersWithPlaceholders:()=>void
}
const initialContext = {
    orders:[],
    addOrder:(order:OrderProps)=>{},
    removeOrder:(id:number)=>{},
    changeOrder:(order:OrderProps)=>{},
    populateOrdersWithPlaceholders:()=>{}
}

export const OrdersContext = React.createContext<OrdersContextProps>(initialContext);


type OrdersContextProviderProps = {
    children: import('react').ReactNode
}

export function OrdersContextProvider(props:OrdersContextProviderProps) {
    const [orders, dispatchOrders] = useReducer<Reducer<OrderProps[],Action>>(OrdersReducer, [])

    const addOrder = (order:OrderProps)=>{
        dispatchOrders({type:"add",data:order})
    }
    const removeOrder = (id:number)=>{
        dispatchOrders({type:"remove",id:id})
    }
    const changeOrder = (order:OrderProps)=>{
        dispatchOrders({type:"change",data:order})
    }

    const populateOrdersWithPlaceholders = ()=>{
        dispatchOrders({type:"populateWithPlaceholders"})
    }
    return (
        <OrdersContext.Provider value={{
            orders,
            addOrder,
            removeOrder,
            changeOrder,
            populateOrdersWithPlaceholders
        }}>
            {props.children}
        </OrdersContext.Provider>
    )
}
