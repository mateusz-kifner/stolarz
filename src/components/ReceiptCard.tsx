import { Card, makeStyles } from "@material-ui/core"
import React from "react"
import { ReceiptProps } from "../context/ReceiptReducer"
import ReceiptCardContent from "./ReceiptCardContent"

const useStyle = makeStyles((theme) => ({
  card: {
    width: "100%",
  },
}))

function ReceiptCard(receipt: ReceiptProps) {
  const classes = useStyle()

  return (
    <Card className={classes.card}>
      <ReceiptCardContent {...receipt} />
    </Card>
  )
}

export default ReceiptCard
