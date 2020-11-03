import React, { useReducer ,Reducer, useEffect} from 'react'
import { Action, ContactsProps, ContactsReducer } from './ContactsReducer';
import useLocalStorage from '../hooks/useLocalStorage'
type ContactsContextProps = {
    contacts: ContactsProps[],
    addContact: (contact:ContactsProps)=>void,
    removeContact: (id:number)=>void,
    changeContact: (contact:ContactsProps)=>void,
    populateContactsWithPlaceholders:()=>void
}

const initialContext = {
    contacts:[],
    addContact:(contact:ContactsProps)=>{},
    removeContact:(id:number)=>{},
    changeContact:(contact:ContactsProps)=>{},
    populateContactsWithPlaceholders:()=>{}
}

export const ContactsContext = React.createContext<ContactsContextProps>(initialContext);


type ContactsContextProviderProps = {
    children: import('react').ReactNode
}

export function ContactsContextProvider(props:ContactsContextProviderProps) {
    const [contacts, dispatchContacts] = useReducer<Reducer<ContactsProps[],Action>>(ContactsReducer, [])
    const [storage, setStorage] = useLocalStorage<any>("contacts",[])
    
    useEffect(() => {
       setContacts(storage)
    }, [])

    useEffect(() => {
        setStorage(contacts)
    })
    
    const addContact = (contact:ContactsProps)=>{
        dispatchContacts({type:"add",data:contact})
    }
    const removeContact = (id:number)=>{
        dispatchContacts({type:"remove",id:id})
    }
    const changeContact = (contact:ContactsProps)=>{
        dispatchContacts({type:"change",data:contact})
    }

    const populateContactsWithPlaceholders = ()=>{
        dispatchContacts({type:"populateWithPlaceholders"})
    }

    const setContacts = (contacts:ContactsProps[])=>{
        dispatchContacts({type:"set",data:contacts})
    }
    return (
        <ContactsContext.Provider value={{
            contacts:contacts,
            addContact,
            removeContact,
            changeContact,
            populateContactsWithPlaceholders
        }}>
            {props.children}
        </ContactsContext.Provider>
    )
}
