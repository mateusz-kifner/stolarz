import {
  AppBar,
  Dialog,
  IconButton,
  ListItem,
  Toolbar,
  Typography,
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { ReceiptItemProps, ReceiptProps } from "../../context/ReceiptReducer"

import CloseIcon from "@material-ui/icons/Close"
import { ReceiptContext } from "../../context/ReceiptContext"
import ReceiptCard from "../../components/ReceiptCard"
import { v4 as uuidv4 } from "uuid"

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
  const { receipts, changeItem } = useContext(ReceiptContext)
  const [recipt, setRecipt] = useState<ReceiptProps>({
    id: -1,
    name: "",
    items: [],
    budget: 0,
    completed: false,
    order_id: null,
  })

  const onItemCheck = (receiptId: number, itemId: number) => {
    changeItem(receiptId, {
      ...receipts[receiptId].items[itemId],
      is_bought: !receipts[receiptId].items[itemId].is_bought,
    })
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
    </Dialog>
  )
}

export default ShoppingList
