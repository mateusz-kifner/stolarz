import { Button, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import PersonIcon from "@material-ui/icons/Person";
import { ContactsProps } from "../context/ContactsReducer";
import ContactsDialog from "../pages/Contacts/ContactsDialog";

const useStyles = makeStyles((theme) => {
  const borderColor =
    theme.palette.type === "light"
      ? "rgba(0, 0, 0, 0.23)"
      : "rgba(255, 255, 255, 0.23)";

  return {
    outline: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      borderWidth: 1,
      borderColor: borderColor,
      borderStyle: "solid",
      padding: "18.5px 14px",
      display: "flex",
      gap: "0.5rem",
      justifyContent: "start",
      "@media (hover: none)": {
        "&:hover": {
          borderColor,
        },
      },
      "&:hover": {
        borderColor: theme.palette.text.primary,
      },
    },
    redBorder: {
      borderColor: theme.palette.error.main,
    },
  };
});

function ContactChoose({
  control,
  name,
  defaultValue,
  rules,
  error,
  value,
}: any) {
  const classes = useStyles();
  const [contact, setContact] = useState<ContactsProps>({
    id: -1,
    firstname: "",
    lastname: "",
    tel: "",
    email: "",
    is_good: true,
  });
  const [showContacts, setShowContacts] = useState<boolean>(false);

  useEffect(() => {
    if (value !== undefined) setContact(value);
  }, [value]);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ onChange }) => (
        <>
          <Button
            className={
              error ? clsx(classes.outline, classes.redBorder) : classes.outline
            }
            startIcon={<PersonIcon />}
            onClick={() => setShowContacts(true)}
          >
            {contact.id === -1 ? (
              <Typography>Choose contact *</Typography>
            ) : (
              <Typography>{`${contact.firstname} ${
                contact.lastname && contact.lastname
              }`}</Typography>
            )}
          </Button>
          <ContactsDialog
            open={showContacts}
            onCloseClick={() => setShowContacts(false)}
            onItemClick={(contact) => {
              onChange(contact);
              setContact(contact);
              setShowContacts(false);
            }}
          />
        </>
      )}
    />
  );
}

export default ContactChoose;
