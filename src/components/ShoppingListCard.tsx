import { Card, makeStyles } from "@material-ui/core"
import React from "react"
import { ShoppingListProps } from "../context/ShoppingListReducer"
import ShoppingListCardContent from "./ShoppingListCardContent"

const useStyle = makeStyles((theme) => ({
  card: {
    width: "100%",
  },
}))

function ShoppingListCard(shoppinglist: ShoppingListProps) {
  const classes = useStyle()

  return (
    <Card className={classes.card}>
      <ShoppingListCardContent {...shoppinglist} />
    </Card>
  )
}

export default ShoppingListCard
