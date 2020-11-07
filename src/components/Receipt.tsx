import React from "react"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { ReceiptProps } from "../context/ReceiptReducer"
import CloseIcon from "@material-ui/icons/Close"
import CheckIcon from "@material-ui/icons/Check"
import { v4 as uuidv4 } from "uuid"

function Receipt(receipt: ReceiptProps & { selectable?: boolean }) {
  return (
    <List dense>
      {receipt.items.map((item) => {
        return (
          <ListItem key={uuidv4()}>
            <ListItemIcon>
              {item.is_bought ? (
                <CheckIcon htmlColor="#388E3C" />
              ) : (
                <CloseIcon htmlColor="disabled" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              secondary={` x${item.amount}`}
              primaryTypographyProps={{ display: "inline" }}
              secondaryTypographyProps={{ display: "inline" }}
            />
          </ListItem>
        )
      })}
    </List>
  )
}

export default Receipt
