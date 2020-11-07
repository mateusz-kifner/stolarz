import React, { SyntheticEvent, useEffect } from "react"
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import WorkIcon from "@material-ui/icons/Work"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"

function BottomTabs({
  history,
  location,
}: import("react-router-dom").RouteChildrenProps) {
  const handleChange = (_: object, newValue: string) => {
    history.push("/" + newValue)
  }

  return (
    <BottomNavigation
      value={location.pathname.split("/")[1]}
      onChange={handleChange}
      showLabels
    >
      <BottomNavigationAction
        label="Orders"
        value="Orders"
        icon={<WorkIcon />}
      />
      <BottomNavigationAction
        label="Shopping List"
        value="Receipt"
        icon={<ShoppingCartIcon />}
      />
      <BottomNavigationAction
        label="Finances"
        value="Finances"
        icon={<AttachMoneyIcon />}
      />
    </BottomNavigation>
  )
}

export default BottomTabs
