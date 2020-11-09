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
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import CloseIcon from "@material-ui/icons/Close"
import { Controller, useForm } from "react-hook-form"
import ContactChoose from "../../components/ContactChoose"
import ReceiptList from "../../components/ReceiptList"
import { ReceiptProps } from "../../context/ReceiptReducer"
import moneyNoDivider from "../../helpers/moneyNoDivider"
import { ReceiptContext } from "../../context/ReceiptContext"
import { OrdersContext } from "../../context/OrdersContext"
import { OrderProps } from "../../context/OrdersReducer"
import { ContactsContext } from "../../context/ContactsContext"
import { ContactsProps } from "../../context/ContactsReducer"
import stringToDate from "../../helpers/stringToDate"
import SimpleCheckBox from "../../components/SimpleCheckBox"

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

function OrdersEdit({
  history,
  match,
}: import("react-router-dom").RouteChildrenProps) {
  const { register, handleSubmit, errors, control, setValue } = useForm()
  const { receipts, addReceipt } = useContext(ReceiptContext)
  const { contacts } = useContext(ContactsContext)
  const { orders, addOrder, changeOrder } = useContext(OrdersContext)
  const classes = useStyles()
  const [order, setOrder] = useState<OrderProps>({
    id: -1,
    name: "",
    desc: "",
    notes: "",

    price_value: 0,
    is_price_paid: false,

    advance_value: 0,
    is_advance_paid: false,

    date_of_completion: null,
    est_date_of_completion: new Date(),
    date_of_issue: new Date(),

    client_id: -1,
    shopping_list_id: null,

    is_anbandoned: false,
    is_completed: false,
  })
  const [receipt, setReceipt] = useState<ReceiptProps>({
    id: -1,
    name: "",
    budget: null,
    items: [],
    completed: false,
    order_id: null,
  })
  const [contact, setContact] = useState<ContactsProps | undefined>()

  useEffect(() => {
    if ((match?.params as { id: string }).id !== undefined) {
      const id: number = parseInt((match?.params as { id: string }).id)

      if (orders[id]) {
        setOrder(orders[id])
      }
    }
  }, [match])

  useEffect(() => {
    setValue("name", order.name)
    setValue("desc", order.desc)
    setValue("notes", order.notes)

    order.price_value !== null &&
      setValue("price_value", order.price_value / 100.0)
    setValue("is_price_paid", order.is_price_paid)

    order.advance_value !== null &&
      setValue("advance_value", order.advance_value / 100.0)
    setValue("is_advance_paid", order.is_advance_paid)

    setValue("is_completed", order.is_completed)
    setValue("is_anbandoned", order.is_anbandoned)

    //Dates
    order.date_of_issue !== null &&
      setValue(
        "time_of_issue",
        new Date(order.date_of_issue).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      )

    order.date_of_issue !== null &&
      setValue(
        "date_of_issue",
        new Date(order.date_of_issue).toISOString().split("T")[0],
      )
    order.date_of_completion !== null &&
      setValue(
        "time_of_completion",
        new Date(order.date_of_completion).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      )
    order.date_of_completion !== null &&
      setValue(
        "date_of_completion",
        new Date(order.date_of_completion).toISOString().split("T")[0],
      )
    order.est_date_of_completion !== null &&
      setValue(
        "est_time_of_completion",
        new Date(order.est_date_of_completion).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      )
    order.est_date_of_completion !== null &&
      setValue(
        "est_date_of_completion",
        new Date(order.est_date_of_completion).toISOString().split("T")[0],
      )

    setContact(contacts[order.client_id])
    setValue("contact", contacts[order.client_id])
    if (order.shopping_list_id !== null)
      setReceipt(receipts[order.shopping_list_id])
  }, [order])

  useEffect(() => {
    setValue("budget", receipt.budget !== null ? receipt.budget / 100.0 : "")
  }, [receipt])

  const today_date_iso = new Date().toISOString().split("T")[0]
  const today_time = new Date()
    .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    .substring(0, 5)
  const handleAddOrder = (data: any) => {
    console.log(data)
    let order_id = order.id !== -1 ? order.id : orders.length
    let shopping_list_id: number | undefined =
      order.shopping_list_id !== null && order.shopping_list_id !== -1
        ? order.shopping_list_id
        : receipts.length

    if (data.items.length > 0) {
      addReceipt({
        id: shopping_list_id,
        name: "Order: " + data.name,
        completed: false,
        order_id: order_id,
        items: [...data.items],
        budget: moneyNoDivider(data.budget),
      })
    }
    let price_value = moneyNoDivider(data.price_value)
    let advance_value = moneyNoDivider(data.advance_value)

    let est_date_of_completion = stringToDate(
      data.est_date_of_completion,
      data.est_time_of_completion,
    )

    let date_of_completion
    let date_of_issue

    if (data.date_of_completion && data.time_of_completion)
      date_of_completion = stringToDate(
        data.date_of_completion,
        data.time_of_completion,
      )
    else date_of_completion = est_date_of_completion

    if (data.date_of_issue && data.time_of_issue)
      date_of_issue = stringToDate(data.date_of_issue, data.time_of_issue)
    else date_of_issue = new Date()

    let new_order: OrderProps = {
      id: order_id,
      name: data.name,
      desc: data.desc,
      notes: data.notes,

      price_value: price_value,
      is_price_paid: price_value > 0 ? data.is_price_paid : true,

      advance_value: advance_value,
      is_advance_paid: advance_value > 0 ? data.is_advance_paid : true,

      date_of_completion: date_of_completion,
      est_date_of_completion: est_date_of_completion,
      date_of_issue: date_of_issue,

      client_id: data.contact.id,
      shopping_list_id: data.items.length > 0 ? shopping_list_id : null,

      is_anbandoned: data.is_anbandoned,
      is_completed: data.is_completed,
    }
    console.log(new_order)

    order.id !== -1 ? changeOrder(new_order) : addOrder(new_order)
    history.goBack()
  }

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
          <Typography variant="h6">
            {order.id !== -1 ? `Edit order` : `Add order`}
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(handleAddOrder)} className={classes.form}>
        <Container maxWidth="sm" className={classes.fieldsContainer}>
          <ContactChoose
            control={control}
            name="contact"
            rules={{ required: true }}
            defaultValue={null}
            error={"contact" in errors}
            value={contact}
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
            name="desc"
            inputRef={register({ required: true })}
            label="Description"
            error={"desc" in errors}
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
              error={"price_value" in errors}
              inputRef={register({ pattern: /^[0-9]+(\.[0-9]{1,2})?$/ })}
              endAdornment={<InputAdornment position="end">PLN</InputAdornment>}
              labelWidth={40}
            />
          </FormControl>
          <Controller
            control={control}
            name="is_price_paid"
            render={({ onChange, value }) => (
              <SimpleCheckBox
                value={value}
                onChange={onChange}
                text="Price paid"
              />
            )}
          />
          <div className={classes.divider}></div>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="advance_value">Advance</InputLabel>
            <OutlinedInput
              name="advance_value"
              id="advance_value"
              type="text"
              error={"advance_value" in errors}
              inputRef={register({ pattern: /^[0-9]+(\.[0-9]{1,2})?$/ })}
              endAdornment={<InputAdornment position="end">PLN</InputAdornment>}
              labelWidth={66}
            />
          </FormControl>
          <Controller
            control={control}
            name="is_advance_paid"
            render={({ onChange, value }) => (
              <SimpleCheckBox
                value={value}
                onChange={onChange}
                text="Advance paid"
              />
            )}
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
            inputRef={register({ pattern: /^[0-9]+(\.[0-9]{1,2})?$/ })}
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
                <ReceiptList receipt={receipt} onChange={onChange} />
              </FormControl>
            )}
          />
          <div className={classes.divider}></div>
          <Controller
            control={control}
            name="is_anbandoned"
            render={({ onChange, value }) => (
              <SimpleCheckBox
                value={value}
                onChange={onChange}
                text="Is anbandoned"
              />
            )}
          />
          <Controller
            control={control}
            name="is_completed"
            render={({ onChange, value }) => (
              <SimpleCheckBox
                value={value}
                onChange={onChange}
                text="Is completed"
              />
            )}
          />
          <div className={classes.divider}></div>
          <Button type="submit" color="primary" variant="contained" fullWidth>
            {order.id !== -1 ? `Edit order` : `Add order`}
          </Button>
        </Container>
      </form>
    </Dialog>
  )
}

export default OrdersEdit
