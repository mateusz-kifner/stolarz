import { Fab, List, ListItem, makeStyles } from "@material-ui/core"
import React, { useContext } from "react"
import AddIcon from "@material-ui/icons/Add"
import { ReciptContext } from "../../context/ReciptContext"
import ReciptCard from "../../components/ReciptCard"

const useStyles = makeStyles({
  reciptContainer: {
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

function ReciptPage({
  history,
}: import("react-router-dom").RouteChildrenProps) {
  const { recipts, addRecipt, removeRecipt, changeRecipt } = useContext(
    ReciptContext,
  )
  const classes = useStyles()

  const goToAddPage = () => {
    history.push("/Recipt/Add")
  }

  return (
    <div className={classes.reciptContainer}>
      <List className={classes.listContainer}>
        {recipts.map((value) => {
          return (
            <ListItem key={"recipt" + value.id}>
              <ReciptCard {...value} />
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

export default ReciptPage
