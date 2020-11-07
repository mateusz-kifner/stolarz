import React from "react"
import BottomTabs from "./components/BottomTabs"
import OrdersPage from "./pages/Orders/OrdersPage"
import ReceiptPage from "./pages/ShoppingList/ShoppingListPage"
import FinancePage from "./pages/Finance/FinancePage"
import TopBar from "./components/TopBar"
import OrdersEdit from "./pages/Orders/OrdersEdit"
import OrdersAdd from "./pages/Orders/OrdersAdd"
import DataView from "./components/DataView"
import { makeStyles } from "@material-ui/core"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import ReceiptAdd from "./pages/ShoppingList/ShoppingListAdd"
import SettingsPage from "./pages/Settings/SettingsPage"
import ContactsPage from "./pages/Contacts/ContactsPage"

const useStyles = makeStyles({
  app: {
    height: "100%",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  content: {
    maxHeight: "100%",
    flexGrow: 1,
    overflow: "hidden",
  },
  bottomNav: {
    // alignSelf:"flex-end",
  },
})

function AppNavigation() {
  const classes = useStyles()

  return (
    <BrowserRouter>
      <div className={classes.app}>
        <Route component={TopBar} />
        <div className={classes.content}>
          <Switch>
            <Redirect path="/" to="/Orders" exact />
            <Route path="/Orders" exact component={OrdersPage} />
            <Route path="/Orders/Add" exact component={OrdersAdd} />
            <Route path="/Orders/Edit" component={OrdersEdit} />
            <Route path="/Receipt" exact component={ReceiptPage} />
            <Route path="/Receipt/Add" exact component={ReceiptAdd} />
            <Route path="/Finances" exact component={FinancePage} />
            <Route path="/Contacts" exact component={ContactsPage} />
            <Route path="/DataView" exact component={DataView} />
            <Route path="/Settings" exact component={SettingsPage} />
            <Route path="/" render={() => <div>404</div>} />
          </Switch>
        </div>
        <div className={classes.bottomNav}>
          <Route component={BottomTabs} />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default AppNavigation
