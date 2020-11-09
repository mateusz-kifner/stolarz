import { Card, makeStyles } from "@material-ui/core"
import React, { memo } from "react"
import { ReceiptProps } from "../context/ReceiptReducer"
import objectsHaveSameData from "../helpers/objectsHaveSameData"
import ReceiptCardContent from "./ReceiptCardContent"

const useStyle = makeStyles((theme) => ({
  card: {
    width: "100%",
  },
}))

type ReceiptCardProps = {
  receipt: ReceiptProps
  onCheck?: (id: number) => void
  onEditClick?: (id: number) => void
  checked?: boolean
  onItemCheck?: (receiptId: number, itemid: number) => void
  checkbox?: boolean
}

function ReceiptCard({
  receipt,
  onCheck,
  checked,
  onItemCheck,
  onEditClick,
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
        onEditClick={onEditClick}
        checkbox={checkbox}
      />
    </Card>
  )
}

export default memo(ReceiptCard, (prevState, state) => {
  return (
    objectsHaveSameData(prevState.receipt, state.receipt) &&
    prevState.checked === state.checked
  )
})
