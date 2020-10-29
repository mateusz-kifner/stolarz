import React, { useReducer } from 'react'

type ShoppingListContextProps  = {
    id:number,
    name:string,
    surname:string | null,
    tel:string | null,
    email:string | null,
    is_good:boolean,
}

const ShoppingListContext = React.createContext<ShoppingListContextProps[]>([]);

function ShoppingListContextProvider() {

    return (
        <ShoppingListContext.Provider value={[]}>

        </ShoppingListContext.Provider>
    )
}