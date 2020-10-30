import { listenerCount } from 'process';
import React, { useReducer, Reducer } from 'react'
import { Action, ShoppingListItemProps, ShoppingListProps, ShoppingListReducer } from './ShoppingListReducer';


type ShoppingListContextProps = {
    recipts: ShoppingListProps[],
    addRecipt: (recipt:ShoppingListProps)=>void,
    removeRecipt: (id:number)=>void,
    changeRecipt: (recipt:ShoppingListProps)=>void,
    populateReciptsWithPlaceholders:()=>void,
    addItem:(list_id:number,item_data:ShoppingListItemProps)=>void,
    removeItem:(list_id:number,item_id:number)=>void
}

const initialContext = {
    recipts:[],
    addRecipt:(recipt:ShoppingListProps)=>{},
    removeRecipt:(id:number)=>{},
    changeRecipt:(recipt:ShoppingListProps)=>{},
    populateReciptsWithPlaceholders:()=>{},
    addItem:(list_id:number,item_data:ShoppingListItemProps)=>{},
    removeItem:(list_id:number,item_id:number)=>{}
}

export const ShoppingListContext = React.createContext<ShoppingListContextProps>(initialContext);


type ShoppingListContextProviderProps = {
    children: import('react').ReactNode
}

export function ShoppingListContextProvider(props:ShoppingListContextProviderProps) {
    const [recipts, dispatchRecipts] = useReducer<Reducer<ShoppingListProps[],Action>>(ShoppingListReducer, [])

    const addRecipt = (recipt:ShoppingListProps)=>{
        dispatchRecipts({type:"addRecipt",data:recipt})
    }
    const removeRecipt = (id:number)=>{
        dispatchRecipts({type:"removeRecipt",list_id:id})
    }
    const changeRecipt = (recipt:ShoppingListProps)=>{
        dispatchRecipts({type:"changeRecipt",list_data:recipt})
    }

    const addItem = (list_id:number,item_data:ShoppingListItemProps)=>{
        dispatchRecipts({type:"addItem",list_id,item_data})
    }

    const removeItem = (list_id:number,item_id:number)=>{
        dispatchRecipts({type:"removeItem",list_id,item_id})
    }

    const populateReciptsWithPlaceholders = ()=>{
        dispatchRecipts({type:"populateWithPlaceholders"})
    }
    return (
        <ShoppingListContext.Provider value={{
            recipts:recipts,
            addRecipt,
            removeRecipt,
            changeRecipt,
            populateReciptsWithPlaceholders,
            addItem,
            removeItem
        }}>
            {props.children}
        </ShoppingListContext.Provider>
    )
}
