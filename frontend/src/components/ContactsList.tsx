import { List } from "@material-ui/core";
import React, { useContext } from "react";
import { ContactsContext } from "../context/ContactsContext";
import { ContactsProps } from "../context/ContactsReducer";
import { v4 as uuidv4 } from "uuid";
import ContactListItem from "./ContactListItem";

type ContactsListProps = {
  onItemClick?: (contact: ContactsProps) => void;
  onEditClick?: (id: number) => void;
};

function ContactsList({ onItemClick, onEditClick }: ContactsListProps) {
  const { contacts } = useContext(ContactsContext);
  return (
    <List dense>
      {contacts
        // .sort((a: any, b: any) => {
        //   let a_fullname = a.name + a.surname + a.id
        //   let b_fullname = b.name + b.surname + b.id

        //   return a_fullname.localeCompare(b_fullname)
        // })
        .filter((contact) => contact !== undefined)
        .map((contact) => {
          return (
            <ContactListItem
              contact={contact}
              key={uuidv4()}
              onItemClick={onItemClick}
              onEditClick={onEditClick}
            />
          );
        })}
    </List>
  );
}

export default ContactsList;
