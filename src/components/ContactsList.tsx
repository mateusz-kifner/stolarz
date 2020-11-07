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

const useStyles = makeStyles((theme) => ({
  avatarCircle: {
    width: "3rem",
    height: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "100%",
    color: theme.palette.background.default,
  },
}))

type ContactsListProps = {
  onItemClick?: (contact: ContactsProps) => void
  onEditClick?: (contact: ContactsProps) => void
}

function ContactsList({ onItemClick, onEditClick }: ContactsListProps) {
  const classes = useStyles()
  const { contacts } = useContext(ContactsContext)
  return (
    <List dense>
      {contacts.map((contact) => {
        return (
          <ListItem
            key={uuidv4()}
            button
            onClick={() => {
              onItemClick && onItemClick(contact)
            }}
          >
            <ListItemAvatar>
              <div className={classes.avatarCircle}>
                <Typography variant="h6">
                  {contact.name[0]}
                  {contact.surname && contact.surname[0]}
                </Typography>
              </div>
            </ListItemAvatar>
            <ListItemText
              primary={`${contact.name} ${contact.surname && contact.surname}`}
              secondary={contact.tel && `tel. ${contact.tel}`}
            />
            {onEditClick && (
              <ListItemSecondaryAction>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        )
      })}
    </List>
  )
}

export default ContactsList
