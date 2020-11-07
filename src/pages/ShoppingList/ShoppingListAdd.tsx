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
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core"
import React, { useState } from "react"
import CloseIcon from "@material-ui/icons/Close"
import { useForm } from "react-hook-form"

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
  },
  form: {
    marginTop: "1.5rem",
    marginBottom: "3rem",
  },
  fieldsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  dateFlex: {
    display: "flex",
    gap: "1rem",
  },
}))

function ReceiptAdd({
  history,
}: import("react-router-dom").RouteChildrenProps) {
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm()
  const today_date = new Date().toISOString().split("T")

  return (
    <Dialog fullScreen open>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={history.goBack}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Add receipt</Typography>
        </Toolbar>
      </AppBar>
      <form
        onSubmit={handleSubmit((values) => {
          console.log(values)
        })}
        className={classes.form}
      >
        <Container maxWidth="sm" className={classes.fieldsContainer}>
          <TextField
            name="name"
            inputRef={register({ required: true })}
            label="Contact"
            error={"contact_id" in errors}
            variant="outlined"
            fullWidth
            required
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="budget">Budget</InputLabel>
            <OutlinedInput
              name="budget"
              id="budget"
              type="text"
              inputRef={register}
              endAdornment={<InputAdornment position="end">PLN</InputAdornment>}
              labelWidth={56}
            />
          </FormControl>
          <TextField
            name="order_id"
            inputRef={register}
            label="Order_id"
            error={"contact_id" in errors}
            variant="outlined"
            fullWidth
          />

          <div>receipt</div>

          <Button type="submit" color="primary" variant="contained" fullWidth>
            Submit
          </Button>
        </Container>
      </form>
    </Dialog>
  )
}

export default ReceiptAdd
