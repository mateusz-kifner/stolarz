import { Fab, List, ListItem, makeStyles } from "@material-ui/core"
import React, { useContext } from "react"
import AddIcon from "@material-ui/icons/Add"
import { ShoppingListContext } from "../../context/ShoppingListContext"
import ShoppingListCard from "../../components/ShoppingListCard"

const useStyles = makeStyles({
  shoppingListContainer: {
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

function ShoppingListPage({
  history,
}: import("react-router-dom").RouteChildrenProps) {
  const { recipts, addRecipt, removeRecipt, changeRecipt } = useContext(
    ShoppingListContext
  )
  const classes = useStyles()

  const goToAddPage = () => {
    history.push("/ShoppingList/Add")
  }

  return (
    <div className={classes.shoppingListContainer}>
      <List className={classes.listContainer}>
        {recipts.map((value) => {
          return (
            <ListItem key={"shoppingList" + value.id}>
              <ShoppingListCard {...value} />
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

export default ShoppingListPage
