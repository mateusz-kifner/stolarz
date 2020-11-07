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
  Divider,
} from "@material-ui/core"
import React, { useState } from "react"
import CloseIcon from "@material-ui/icons/Close"
import { Controller, useForm } from "react-hook-form"
import ContactChoose from "../../components/ContactChoose"
import ReceiptItemList from "../../components/ReceiptList"
import { ReceiptProps } from "../../context/ReceiptReducer"

const useStyles = makeStyles((theme) => {
  const borderColor =
    theme.palette.type === "light"
      ? "rgba(0, 0, 0, 0.23)"
      : "rgba(255, 255, 255, 0.23)"

  return {
    grid: {
      width: "100%",
      position: "relative",
      marginLeft: "auto",
      marginRight: "auto",
    },
    form: {
      marginTop: "3rem",
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
      "&:focused": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
    outlineLabel: {
      backgroundColor: theme.palette.common.white,
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
    },
    divider: {
      height: "1rem",
    },
  }
})

function OrdersAdd({ history }: import("react-router-dom").RouteChildrenProps) {
  const classes = useStyles()
  const { register, handleSubmit, errors, control } = useForm()
  const today_date = new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
  const today_date_iso = `${today_date[2]}-${today_date[1]}-${today_date[0]}`
  const today_time = new Date()
    .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    .substring(0, 5)

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
          <Typography variant="h6">Add order</Typography>
        </Toolbar>
      </AppBar>
      <form
        onSubmit={handleSubmit((values) => {
          console.log(values)
        })}
        className={classes.form}
      >
        <Container maxWidth="sm" className={classes.fieldsContainer}>
          <ContactChoose
            control={control}
            name="contact"
            rules={{ required: true }}
            defaultValue={null}
            error={"contact" in errors}
          />
          <div className={classes.divider}></div>
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
            name="description"
            inputRef={register({ required: true })}
            label="Description"
            error={"description" in errors}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            rowsMax={20}
            required
          />
          <TextField
            name="notes"
            inputRef={register}
            label="Notes"
            error={"notes" in errors}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            rowsMax={20}
          />
          <div className={classes.divider}></div>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="price_value">Price</InputLabel>
            <OutlinedInput
              name="price_value"
              id="price_value"
              type="text"
              inputRef={register}
              endAdornment={<InputAdornment position="end">PLN</InputAdornment>}
              labelWidth={40}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                name="is_price_paid"
                color="primary"
                defaultValue="false"
                inputRef={register}
              />
            }
            label="Price paid"
          />
          <div className={classes.divider}></div>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="advance_value">Advance</InputLabel>
            <OutlinedInput
              name="advance_value"
              id="advance_value"
              type="text"
              inputRef={register}
              endAdornment={<InputAdornment position="end">PLN</InputAdornment>}
              labelWidth={66}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                name="is_advance_paid"
                color="primary"
                defaultValue="false"
                inputRef={register}
              />
            }
            label="Advance paid"
          />
          <div className={classes.divider}></div>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              htmlFor="date_of_completion"
              shrink={true}
              className={classes.outlineLabel}
            >
              Date of issue
            </InputLabel>
            <div className={classes.outline}>
              <TextField
                id="date_of_issue"
                name="date_of_issue"
                type="date"
                defaultValue={today_date_iso}
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register}
                disabled
                fullWidth
              />
              <TextField
                id="time_of_issue"
                name="time_of_issue"
                type="time"
                defaultValue={today_time}
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register}
                disabled
                fullWidth
              />
            </div>
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              htmlFor="date_of_completion"
              shrink={true}
              className={classes.outlineLabel}
            >
              Estimated date of completion
            </InputLabel>
            <div className={classes.outline}>
              <TextField
                id="est_date_of_completion"
                name="est_date_of_completion"
                type="date"
                defaultValue={today_date_iso}
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register}
                fullWidth
              />
              <TextField
                id="est_time_of_completion"
                name="est_time_of_completion"
                type="time"
                defaultValue="12:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register}
                fullWidth
              />
            </div>
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              htmlFor="date_of_completion"
              shrink={true}
              className={classes.outlineLabel}
            >
              Date of completion
            </InputLabel>

            <div className={classes.outline}>
              <TextField
                id="date_of_completion"
                name="date_of_completion"
                type="date"
                defaultValue={today_date_iso}
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register}
                disabled
                fullWidth
              />
              <TextField
                id="time_of_completion"
                name="time_of_completion"
                type="time"
                defaultValue="12:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register}
                disabled
                fullWidth
              />
            </div>
          </FormControl>
          <div className={classes.divider}></div>
          <TextField
            name="budget"
            inputRef={register}
            label="Shopping budget"
            error={"budget" in errors}
            variant="outlined"
            fullWidth
          />
          <Controller
            name="items"
            control={control}
            defaultValue={null}
            render={({ onChange }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  htmlFor="date_of_completion"
                  shrink={true}
                  className={classes.outlineLabel}
                >
                  Shopping List
                </InputLabel>
                <ReceiptItemList
                  receipt={{
                    name: "",
                    budget: null,
                    items: [],
                    completed: false,
                    order_id: null,
                  }}
                  onChange={onChange}
                />
              </FormControl>
            )}
          />
          <div className={classes.divider}></div>
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Add order
          </Button>
        </Container>
      </form>
    </Dialog>
  )
}

export default OrdersAdd
