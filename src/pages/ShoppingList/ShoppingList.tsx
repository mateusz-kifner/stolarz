import {
  AppBar,
  Button,
  Container,
  Dialog,
  IconButton,
  ListItem,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core"
import React, { useContext, useState } from "react"

import CloseIcon from "@material-ui/icons/Close"
import { ReceiptContext } from "../../context/ReceiptContext"
import ReceiptCard from "../../components/ReceiptCard"
import { v4 as uuidv4 } from "uuid"
import { useForm } from "react-hook-form"
import moneyNoDivider from "../../helpers/moneyNoDivider"

const useStyles = makeStyles((theme) => ({
  stopShoppingDialog: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "3rem",
  },
}))

type ShoppingListProps = {
  ids: number[]
  open?: boolean
  onCloseClick?: () => void
  onEditClick?: (id: number) => void
}

function ShoppingList({
  ids,
  open,
  onCloseClick,
  onEditClick,
}: ShoppingListProps) {
  const classes = useStyles()
  const { receipts, changeItem, changeReceipt } = useContext(ReceiptContext)
  const { register, handleSubmit, errors } = useForm()

  // const [recipt, setRecipt] = useState<ReceiptProps>({
  //   id: -1,
  //   name: "",
  //   items: [],
  //   budget: 0,
  //   completed: false,
  //   order_id: null,
  // })
  const [stopShopping, setStopShopping] = useState<boolean>(false)

  const onItemCheck = (receiptId: number, itemId: number) => {
    changeItem(receiptId, {
      ...receipts[receiptId].items[itemId],
      is_bought: !receipts[receiptId].items[itemId].is_bought,
    })
  }

  const handleShoppingEnd = (value: any) => {
    console.log(value)
    for (let val in value) {
      let id = parseInt(val)
      if (value[val].length > 0)
        changeReceipt({
          ...receipts[id],
          items: receipts[id].items,
          money_spent: moneyNoDivider(value[val]),
        })
    }
    onCloseClick && onCloseClick()
  }

  return (
    <Dialog open={open ? true : false} fullScreen>
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
          <Typography variant="h6">Shopping</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        {ids
          .map((id) => receipts[id])
          .map((receipt) => {
            return (
              <ListItem key={uuidv4()}>
                <ReceiptCard
                  receipt={receipt}
                  onItemCheck={onItemCheck}
                  onEditClick={onEditClick}
                  checkbox={true}
                />
              </ListItem>
            )
          })}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setStopShopping(true)}
        >
          Stop shopping
        </Button>
      </Container>
      <Dialog open={stopShopping} onClose={() => setStopShopping(false)}>
        <form
          className={classes.stopShoppingDialog}
          onSubmit={handleSubmit(handleShoppingEnd)}
        >
          <Typography variant="body1" gutterBottom>
            Receipts
          </Typography>
          {ids
            .map((id) => receipts[id])
            .map((value) => {
              return (
                <TextField
                  name={value.id?.toString()}
                  key={"shoppingListShoppingList" + value.id}
                  inputRef={register({ pattern: /^[0-9]+(\.[0-9]{1,2})?$/ })}
                  label={value.name}
                  defaultValue={null}
                  error={
                    value.id !== undefined && value.id?.toString() in errors
                  }
                  variant="outlined"
                  fullWidth
                />
              )
            })}
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Stop shopping
          </Button>
        </form>
      </Dialog>
    </Dialog>
  )
}

export default ShoppingList
