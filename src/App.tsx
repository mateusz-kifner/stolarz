import React from "react"
import { ContactsContextProvider } from "./context/ContactsContext"
import { OrdersContextProvider } from "./context/OrdersContext"
import { ReciptContextProvider } from "./context/ReciptContext"
import { CssBaseline } from "@material-ui/core"
import AppNavigation from "./AppNavigation"
import { UserSettingsContextProvider } from "./context/UserSettingsContext"

function App() {
  return (
    <>
      <CssBaseline />
      <ContactsContextProvider>
        <ReciptContextProvider>
          <OrdersContextProvider>
            <UserSettingsContextProvider>
              <AppNavigation />
            </UserSettingsContextProvider>
          </OrdersContextProvider>
        </ReciptContextProvider>
      </ContactsContextProvider>
    </>
  )
}

export default App
