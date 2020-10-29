import React, { useReducer } from 'react'

type OrdersContextProps  = {
    id:number,
    name:string,
    surname:string | null,
    tel:string | null,
    email:string | null,
    is_good:boolean,
}

const OrdersContext = React.createContext<OrdersContextProps[]>([]);

function OrdersContextProvider() {

    return (
        <OrdersContext.Provider value={[]}>

        </OrdersContext.Provider>
    )
}