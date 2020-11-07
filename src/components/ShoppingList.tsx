import React from "react"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { ShoppingListProps } from "../context/ShoppingListReducer"
import CloseIcon from "@material-ui/icons/Close"
import CheckIcon from "@material-ui/icons/Check"

function ShoppingList(
  shoppinglist: ShoppingListProps & { selectable?: boolean }
) {
  return (
    <List dense>
      {shoppinglist.items.map((item) => {
        {
          console.log(item.name)
        }
        return (
          <ListItem key={`shoppingList${shoppinglist.id}item${item.id}`}>
            <ListItemIcon>
              {item.is_bought ? (
                <CheckIcon htmlColor="#388E3C" />
              ) : (
                <CloseIcon htmlColor="disabled" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              secondary={` x${item.amount}`}
              primaryTypographyProps={{ display: "inline" }}
              secondaryTypographyProps={{ display: "inline" }}
            />
          </ListItem>
        )
      })}
    </List>
  )
}

export default ShoppingList
