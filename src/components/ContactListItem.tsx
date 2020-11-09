import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { memo } from "react"
import { ContactsProps } from "../context/ContactsReducer"
import EditIcon from "@material-ui/icons/Edit"
import objectsHaveSameData from "../helpers/objectsHaveSameData"

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

type ContactListItemProps = {
  contact: ContactsProps
  onItemClick?: (contact: ContactsProps) => void
  onEditClick?: (id: number) => void
}
function ContactListItem({
  onItemClick,
  contact,
  onEditClick,
}: ContactListItemProps) {
  const classes = useStyles()

  return (
    <ListItem
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
          <IconButton
            onClick={() => contact.id !== undefined && onEditClick(contact.id)}
          >
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
}

export default memo(
  ContactListItem,
  (prevProps: ContactListItemProps, nextProps: ContactListItemProps) => {
    return objectsHaveSameData(prevProps.contact, nextProps.contact)
  },
)
