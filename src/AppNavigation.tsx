import React from "react"
import BottomTabs from "./components/BottomTabs"
import OrdersPage from "./pages/Orders/OrdersPage"
import ShoppingListPage from "./pages/ShoppingList/ShoppingListPage"
import FinancePage from "./pages/Finance/FinancePage"
import TopBar from "./components/TopBar"
import OrdersEdit from "./pages/Orders/OrdersEdit"
import DataView from "./components/DataView"
import { makeStyles } from "@material-ui/core"
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import SettingsPage from "./pages/Settings/SettingsPage"
import ContactsPage from "./pages/Contacts/ContactsPage"
import OrderById from "./pages/Orders/OrderById"
import ShoppingListEdit from "./pages/ShoppingList/ShoppingListEdit"

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
    <Router>
      <div className={classes.app}>
        <Route component={TopBar} />
        <div className={classes.content}>
          <Switch>
            <Redirect path="/" to="/Orders" exact />
            <Redirect path="/stolarz" to="/Orders" exact />
            <Route path="/Orders" exact component={OrdersPage} />
            <Route path="/Orders/Add" exact component={OrdersEdit} />
            <Route path="/Orders/Edit/:id" component={OrdersEdit} />
            <Route path="/Orders/Id/:id" component={OrderById} />
            <Route path="/ShoppingList" exact component={ShoppingListPage} />
            <Route
              path="/ShoppingList/Add"
              exact
              component={ShoppingListEdit}
            />
            <Route
              path="/ShoppingList/Edit/:id"
              exact
              component={ShoppingListEdit}
            />
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
    </Router>
  )
}

export default AppNavigation
