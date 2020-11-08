import { Card, makeStyles } from "@material-ui/core"
import React from "react"
import { ReceiptProps } from "../context/ReceiptReducer"
import ReceiptCardContent from "./ReceiptCardContent"

const useStyle = makeStyles((theme) => ({
  card: {
    width: "100%",
  },
}))

type ReceiptCardProps = {
  receipt: ReceiptProps
  onCheck?: (id: number) => void
  checked?: boolean
  onItemCheck?: (receiptId: number, itemid: number) => void
  checkbox?: boolean
}

function ReceiptCard({
  receipt,
  onCheck,
  checked,
  onItemCheck,
  checkbox,
}: ReceiptCardProps) {
  const classes = useStyle()

  return (
    <Card className={classes.card}>
      <ReceiptCardContent
        receipt={receipt}
        onCheck={onCheck}
        checked={checked}
        onItemCheck={onItemCheck}
        checkbox={checkbox}
      />
    </Card>
  )
}

export default ReceiptCard
