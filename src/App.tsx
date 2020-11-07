import React from "react"
import { ContactsContextProvider } from "./context/ContactsContext"
import { OrdersContextProvider } from "./context/OrdersContext"
import { ShoppingListContextProvider } from "./context/ShoppingListContext"
import { CssBaseline } from "@material-ui/core"
import AppNavigation from "./AppNavigation"
import { UserSettingsContextProvider } from "./context/UserSettingsContext"

function App() {
  return (
    <>
      <CssBaseline />
      <ContactsContextProvider>
        <ShoppingListContextProvider>
          <OrdersContextProvider>
            <UserSettingsContextProvider>
              <AppNavigation />
            </UserSettingsContextProvider>
          </OrdersContextProvider>
        </ShoppingListContextProvider>
      </ContactsContextProvider>
    </>
  )
}

export default App
