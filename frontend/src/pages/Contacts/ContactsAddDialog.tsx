import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core"
import React, { useEffect } from "react"
import CloseIcon from "@material-ui/icons/Close"
import { useForm } from "react-hook-form"
import { ContactsProps } from "../../context/ContactsReducer"

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: "1.5rem",
    marginBottom: "3rem",
  },
  fieldsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
}))

type ContactsAddDialogProps = {
  onCloseClick: () => void
  onAddClick: (contact: ContactsProps) => void
  open: boolean
  contact?: ContactsProps
}

function ContactsAddDialog({
  onCloseClick,
  onAddClick,
  open,
  contact,
}: ContactsAddDialogProps) {
  const classes = useStyles()
  const { register, handleSubmit, errors, setValue } = useForm()

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (contact !== undefined) {
        setValue("name", contact.name, { shouldDirty: true })
        setValue("surname", contact.surname, { shouldDirty: true })
        setValue("tel", contact.tel, { shouldDirty: true })
        setValue("email", contact.email, { shouldDirty: true })
      }
    }, 4)
    return () => {
      clearTimeout(timeout)
    }
  })

  return (
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
          <Typography variant="h6">Add contact</Typography>
        </Toolbar>
      </AppBar>
      <form
        onSubmit={handleSubmit(
          (values: {
            name: string
            surname: string
            tel: string
            email: string
          }) => {
            onAddClick({ ...values, is_good: true })
          }
        )}
        className={classes.form}
      >
        <Container maxWidth="sm" className={classes.fieldsContainer}>
          <TextField
            name="name"
            inputRef={register({ required: true })}
            label="Name"
            error={"name" in errors}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            name="surname"
            inputRef={register}
            label="Surname"
            error={"surname" in errors}
            variant="outlined"
            fullWidth
          />
          <TextField
            name="tel"
            type="tel"
            inputRef={register({
              pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
            })}
            label="Phone number"
            error={"tel" in errors}
            variant="outlined"
            fullWidth
          />
          <TextField
            name="email"
            inputRef={register}
            label="Email"
            type="email"
            error={"email" in errors}
            variant="outlined"
            fullWidth
          />

          <Button type="submit" color="primary" variant="contained" fullWidth>
            Add
          </Button>
        </Container>
      </form>
    </Dialog>
  )
}

export default ContactsAddDialog
