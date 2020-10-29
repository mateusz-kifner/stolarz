import React, { useReducer } from 'react'

type ContactsContextProps  = {
    id:number,
    name:string,
    surname:string | null,
    tel:string | null,
    email:string | null,
    is_good:boolean,
}

const ContactsContext = React.createContext<ContactsContextProps[]>([]);

function ContactsContextProvider() {

    return (
        <ContactsContext.Provider value={[]}>

        </ContactsContext.Provider>
    )
}