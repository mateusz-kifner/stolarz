import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { useContext } from "react"
import EditIcon from "@material-ui/icons/Edit"
import { ContactsContext } from "../context/ContactsContext"
import { ContactsProps } from "../context/ContactsReducer"
import { v4 as uuidv4 } from "uuid"
import ContactListItem from "./ContactListItem"

type ContactsListProps = {
  onItemClick?: (contact: ContactsProps) => void
  onEditClick?: (id: number) => void
}

function ContactsList({ onItemClick, onEditClick }: ContactsListProps) {
  const { contacts } = useContext(ContactsContext)
  return (
    <List dense>
      {contacts.map((contact) => {
        return (
          <ContactListItem
            contact={contact}
            key={uuidv4()}
            onItemClick={onItemClick}
          />
        )
      })}
    </List>
  )
}

export default ContactsList
