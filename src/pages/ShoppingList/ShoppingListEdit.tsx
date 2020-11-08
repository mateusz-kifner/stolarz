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
import ReceiptList from "../../components/ReceiptList"
import { ReceiptProps } from "../../context/ReceiptReducer"
import { ReceiptContext } from "../../context/ReceiptContext"
import moneyNoDivider from "../../helpers/moneyNoDivider"

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

function ShoppingListEdit({
  history,
  match,
}: import("react-router-dom").RouteChildrenProps) {
  const classes = useStyles()
  const { register, handleSubmit, errors, control, setValue } = useForm()
  const today_date = new Date().toISOString().split("T")
  const { receipts, addReceipt } = useContext(ReceiptContext)
  const defaultReceipt: ReceiptProps = {
    name: "",
    budget: 0,
    completed: false,
    order_id: null,
    items: [],
  }
  const [receipt, setReceipt] = useState(defaultReceipt)

  useEffect(() => {
    if ((match?.params as { id: string }).id !== undefined) {
      const id: number = parseInt((match?.params as { id: string }).id)

      if (receipts[id]) setReceipt(receipts[id])
    }
  })

  useEffect(() => {
    setValue("name", receipt.name)
    setValue("budget", receipt.budget !== null ? receipt.budget / 100.0 : "")
    console.log(receipt)
  }, [receipt])

  const handleReceiptEdit = (receipt_form_form: any) => {
    addReceipt({
      ...receipt_form_form,
      id: receipt.id !== undefined ? receipt.id : undefined,
      order_id: null,
      items: [...receipt_form_form.items],
      budget: moneyNoDivider(receipt_form_form.budget),
    })
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
          <Typography variant="h6">Add receipt</Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(handleReceiptEdit)} className={classes.form}>
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
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="budget">Budget</InputLabel>
            <OutlinedInput
              name="budget"
              id="budget"
              type="text"
              error={"budget" in errors}
              inputRef={register({ pattern: /^[0-9]+(\.[0-9]{1,2})?$/ })}
              endAdornment={<InputAdornment position="end">PLN</InputAdornment>}
              labelWidth={56}
            />
          </FormControl>
          {/* <TextField
            name="order_id"
            inputRef={register}
            label="Order_id"
            error={"order_id" in errors}
            variant="outlined"
            fullWidth
          /> */}
          <Controller
            name="items"
            control={control}
            render={({ onChange }) => (
              <ReceiptList receipt={receipt} onChange={onChange} />
            )}
          />

          <Button type="submit" color="primary" variant="contained" fullWidth>
            Add receipt
          </Button>
        </Container>
      </form>
    </Dialog>
  )
}

export default ShoppingListEdit
