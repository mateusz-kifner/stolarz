import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { memo } from "react"
import { ReceiptItemProps } from "../context/ReceiptReducer"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import objectsHaveSameData from "../helpers/objectsHaveSameData"

const useStyles = makeStyles({
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
})

type ReceiptListItemProps = {
  item: ReceiptItemProps
  toggleIsBought: (item: ReceiptItemProps) => void
  decrementAmount: (item: ReceiptItemProps) => void
  incrementAmount: (item: ReceiptItemProps) => void
}

function ReceiptListItem({
  item,
  toggleIsBought,
  decrementAmount,
  incrementAmount,
}: ReceiptListItemProps) {
  const classes = useStyles()
  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          edge="start"
          tabIndex={-1}
          checked={item.is_bought}
          onChange={() => toggleIsBought(item)}
          inputProps={{ "aria-labelledby": "item" + item.id }}
        />
      </ListItemIcon>
      {item.amount < 1 && <DeleteForeverIcon htmlColor="#D32F2F" />}
      <ListItemText id={"item" + item.id} primary={item.name} />
      <ListItemSecondaryAction className={classes.actions}>
        <IconButton
          aria-label="Remove"
          onClick={() => decrementAmount(item)}
          disabled={item.amount < 1}
        >
          <RemoveIcon />
        </IconButton>
        <Typography variant="body2">{item.amount}</Typography>
        <IconButton aria-label="Add" onClick={() => incrementAmount(item)}>
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default memo(ReceiptListItem, (prevProps, nextProps) => {
  return objectsHaveSameData(prevProps.item, nextProps.item)
})
