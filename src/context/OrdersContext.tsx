import React, { Reducer, useEffect, useReducer } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { Action, OrderProps, OrdersReducer } from './OrdersReducer';

type OrdersContextProps={
    orders:OrderProps[],
    addOrder:(order:OrderProps)=>void,
    setOrders:(order:OrderProps[])=>void,
    removeOrder:(id:number)=>void,
    changeOrder:(order:OrderProps)=>void,
    populateOrdersWithPlaceholders:()=>void
}
const initialContext = {
    orders:[],
    setOrders:(order:OrderProps[])=>{},
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
    const [storage, setStorage] = useLocalStorage<any>("orders",[])
    
    useEffect(() => {
       setOrders(storage.map((value:OrderProps)=>{
        let date_of_issue:Date = new Date(value.date_of_issue)
        let est_date_of_completion:Date | null 
        let date_of_completion:Date | null 
        if (value.est_date_of_completion == null)
            est_date_of_completion = null
        else
            est_date_of_completion = new Date(value.est_date_of_completion)
        
        if (value.date_of_completion == null)
            date_of_completion = null
        else
            date_of_completion = new Date(value.date_of_completion)
        return {...value, date_of_completion,est_date_of_completion,date_of_issue}
    }))
    }, [])

    useEffect(() => {
        setStorage(orders)
    })

    const setOrders = (orders:OrderProps[])=>{
        dispatchOrders({type:"set",data:orders})
    }
    
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
            setOrders,
            addOrder,
            removeOrder,
            changeOrder,
            populateOrdersWithPlaceholders
        }}>
            {props.children}
        </OrdersContext.Provider>
    )
}
