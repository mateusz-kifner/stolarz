import React, { useReducer, Reducer, useEffect, useContext } from "react";
import { Action, ContactsProps, ContactsReducer } from "./ContactsReducer";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import { UserSettingsContext } from "./UserSettingsContext";
type ContactsContextProps = {
  contacts: ContactsProps[];
  setContacts: (contact: ContactsProps[]) => void;
  addContact: (contact: ContactsProps) => void;
  removeContact: (id: number) => void;
  changeContact: (contact: ContactsProps) => void;
};

const initialContext = {
  contacts: [],
  setContacts: (contact: ContactsProps[]) => {},
  addContact: (contact: ContactsProps) => {},
  removeContact: (id: number) => {},
  changeContact: (contact: ContactsProps) => {},
};

export const ContactsContext =
  React.createContext<ContactsContextProps>(initialContext);

type ContactsContextProviderProps = {
  children: import("react").ReactNode;
};

export function ContactsContextProvider(props: ContactsContextProviderProps) {
  const [contacts, dispatchContacts] = useReducer<
    Reducer<ContactsProps[], Action>
  >(ContactsReducer, []);
  const [storage, setStorage] = useLocalStorage<any>("contacts", []);
  const userSettingsContext = useContext(UserSettingsContext);
  useEffect(() => {
    axios
      .get("/contacts")
      .then((res) => {
        dispatchContacts({ type: "set", data: res.data });
      })
      .catch((err) => {});
    //setContacts(storage);
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   setStorage(contacts);
  // });

  const setContacts = (contacts: ContactsProps[]) => {
    //todo add setcontacts
    dispatchContacts({ type: "set", data: contacts });
  };

  const addContact = (contact: ContactsProps) => {
    axios
      .post("/contacts", contact)
      .then((_) => dispatchContacts({ type: "add", data: contact }))
      .catch((e) => console.log("contact add network error"));
  };
  const removeContact = (id: number) => {
    axios
      .delete(`/contacts/${id}`)
      .then((_) => dispatchContacts({ type: "remove", id: id }))
      .catch((e) => console.log("contact remove network error"));
  };
  const changeContact = (contact: ContactsProps) => {
    axios
      .put(`/contacts/${contact.id}`, contact)
      .then((res) => dispatchContacts({ type: "change", data: res.data }))
      .catch((e) => console.log("contact change network error"));
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts: contacts,
        setContacts,
        addContact,
        removeContact,
        changeContact,
      }}
    >
      {props.children}
    </ContactsContext.Provider>
  );
}
