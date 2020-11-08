import { Fab, List, ListItem, makeStyles, Typography } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import AddIcon from "@material-ui/icons/Add"
import { ReceiptContext } from "../../context/ReceiptContext"
import ReceiptCard from "../../components/ReceiptCard"
import { v4 as uuidv4 } from "uuid"
import ShoppingList from "./ShoppingList"

const useStyles = makeStyles({
  receiptContainer: {
    height: "100%",
    position: "relative",
  },
  listContainer: {
    height: "100%",
    overflowY: "scroll",
  },
  flotingButtons: {
    position: "absolute",
    bottom: "5vmin",
    right: "5vmin",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "1rem",
  },
})

function ShoppingListPage({
  history,
}: import("react-router-dom").RouteChildrenProps) {
  const { receipts, addReceipt, removeReceipt, changeReceipt } = useContext(
    ReceiptContext,
  )
  const classes = useStyles()
  const [checked, setChecked] = useState<boolean[]>([])
  const [shoppingListOpen, setShoppingListOpen] = useState<boolean>(false)

  const goToAddPage = () => {
    history.push("/ShoppingList/Add")
  }

  const goToShoppingList = () => {
    setShoppingListOpen(true)
  }

  const onCheck = (id: number) => {
    setChecked((prevState: boolean[]) => {
      let new_state = [...prevState]
      new_state[id] = !new_state[id]
      return new_state
    })
  }

  useEffect(() => {
    if (receipts.length !== checked.length) {
      setChecked(Array(receipts.length).fill(false))
    }
  })

  return (
    <div className={classes.receiptContainer}>
      <List className={classes.listContainer}>
        {receipts.map((receipt, index) => {
          return (
            <ListItem key={"shoppingPageRecipt" + index}>
              <ReceiptCard
                receipt={receipt}
                onCheck={onCheck}
                checked={receipt.id !== undefined && checked[receipt.id]}
                onEditClick={(id) => {
                  history.push("/ShoppingList/Edit/" + id)
                }}
              />
            </ListItem>
          )
        })}
      </List>
      <div className={classes.flotingButtons}>
        <Fab color="secondary" aria-label="add" onClick={goToAddPage}>
          <AddIcon />
        </Fab>
        {/* show Start shopping if any checkbox is check */}
        {checked.reduce((prevVal: any, val: any) => {
          return (prevVal ? 1 : 0) + (val ? 1 : 0)
        }, 0) > 0 && (
          <Fab
            color="secondary"
            aria-label="start shopping"
            onClick={goToShoppingList}
            variant="extended"
          >
            Start shopping
          </Fab>
        )}
      </div>
      <ShoppingList
        ids={checked
          .map((value, index) => (value ? index : -1))
          .filter((value) => value !== -1)}
        open={shoppingListOpen}
        onCloseClick={() => setShoppingListOpen(false)}
      />
    </div>
  )
}

export default ShoppingListPage
