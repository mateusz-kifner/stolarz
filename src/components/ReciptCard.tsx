import { Card, makeStyles } from "@material-ui/core"
import React from "react"
import { ReciptProps } from "../context/ReciptReducer"
import ReciptCardContent from "./ReciptCardContent"

const useStyle = makeStyles((theme) => ({
  card: {
    width: "100%",
  },
}))

function ReciptCard(recipt: ReciptProps) {
  const classes = useStyle()

  return (
    <Card className={classes.card}>
      <ReciptCardContent {...recipt} />
    </Card>
  )
}

export default ReciptCard
