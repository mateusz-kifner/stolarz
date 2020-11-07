import { Fab, List, ListItem, makeStyles } from "@material-ui/core"
import React, { useContext } from "react"
import AddIcon from "@material-ui/icons/Add"
import { ReceiptContext } from "../../context/ReceiptContext"
import ReceiptCard from "../../components/ReceiptCard"

const useStyles = makeStyles({
  receiptContainer: {
    height: "100%",
    position: "relative",
  },
  listContainer: {
    height: "100%",
    overflowY: "scroll",
  },
  flotingAdd: {
    position: "absolute",
    bottom: "5vmin",
    right: "5vmin",
  },
})

function ReceiptPage({
  history,
}: import("react-router-dom").RouteChildrenProps) {
  const { receipts, addReceipt, removeReceipt, changeReceipt } = useContext(
    ReceiptContext,
  )
  const classes = useStyles()

  const goToAddPage = () => {
    history.push("/Receipt/Add")
  }

  return (
    <div className={classes.receiptContainer}>
      <List className={classes.listContainer}>
        {receipts.map((value) => {
          return (
            <ListItem key={"receipt" + value.id}>
              <ReceiptCard {...value} />
            </ListItem>
          )
        })}
      </List>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.flotingAdd}
        onClick={goToAddPage}
      >
        <AddIcon />
      </Fab>
    </div>
  )
}

export default ReceiptPage
