import { Button, makeStyles, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { Controller } from "react-hook-form"
import PersonIcon from "@material-ui/icons/Person"
import { ContactsProps } from "../context/ContactsReducer"
import ContactsDialog from "../pages/Contacts/ContactsDialog"

const useStyles = makeStyles((theme) => {
  const borderColor =
    theme.palette.type === "light"
      ? "rgba(0, 0, 0, 0.23)"
      : "rgba(255, 255, 255, 0.23)"

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
  }
})

function ContactChoose({ control, name }: any) {
  const classes = useStyles()
  const [contact, setContact] = useState<ContactsProps | undefined>()
  const [showContacts, setShowContacts] = useState<boolean>(false)

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      defaultValue={undefined}
      render={({ onChange, onBlur, value, name, ref }) => (
        <>
          <Button
            className={classes.outline}
            startIcon={<PersonIcon />}
            onClick={() => setShowContacts(true)}
          >
            {contact == null ? (
              <Typography>Choose contact</Typography>
            ) : (
              <Typography>{`${contact.name} ${
                contact.surname && contact.surname
              }`}</Typography>
            )}
          </Button>
          <ContactsDialog
            open={showContacts}
            onCloseClick={() => setShowContacts(false)}
            onItemClick={(contact) => {
              onChange(contact)
              setContact(contact)
              setShowContacts(false)
            }}
          />
        </>
      )}
    />
  )
}

export default ContactChoose
