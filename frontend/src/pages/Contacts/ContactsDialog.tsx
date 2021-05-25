import {
  AppBar,
  Dialog,
  Fab,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import ContactsList from "../../components/ContactsList";
import { ContactsProps } from "../../context/ContactsReducer";
import ContactsAddDialog from "./ContactsAddDialog";
import { ContactsContext } from "../../context/ContactsContext";

const useStyles = makeStyles((theme) => ({
  flotingAdd: {
    position: "absolute",
    bottom: "5vmin",
    right: "5vmin",
  },
}));

type ContactsDialogProps = {
  onCloseClick: () => void;
  onItemClick?: (contact: ContactsProps) => void;
  allowEditing?: boolean;
  open?: boolean;
};

function ContactsDialog({
  onCloseClick,
  onItemClick,
  open,
  allowEditing,
}: ContactsDialogProps) {
  const classes = useStyles();
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const { contacts, addContact, changeContact } = useContext(ContactsContext);
  const [contact, setContact] = useState<ContactsProps>();

  const onAddClick = (contact_from_add: ContactsProps) => {
    if (contact !== undefined && contact.id !== undefined && contact.id >= 0)
      changeContact({ ...contact_from_add, id: contact.id });
    else addContact(contact_from_add);
    setShowAddDialog(false);
  };
  const onEditClick = (id: number) => {
    console.log(id);
    setShowAddDialog(true);
    setContact(contacts[id]);
  };
  return (
    <>
      <Dialog fullScreen open={open ? true : false}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={onCloseClick}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Contacts</Typography>
          </Toolbar>
        </AppBar>
        <ContactsList
          onEditClick={allowEditing !== undefined ? onEditClick : undefined}
          onItemClick={onItemClick}
        />
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.flotingAdd}
          onClick={() => {
            setShowAddDialog(true);
            setContact({
              firstname: "",
              lastname: "",
              tel: "",
              email: "",
              is_good: true,
            });
          }}
        >
          <AddIcon />
        </Fab>
      </Dialog>
      <ContactsAddDialog
        open={showAddDialog}
        onCloseClick={() => setShowAddDialog(false)}
        onAddClick={onAddClick}
        contact={contact}
      />
    </>
  );
}

export default ContactsDialog;
