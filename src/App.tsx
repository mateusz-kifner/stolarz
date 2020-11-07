import React from "react"
import { ContactsContextProvider } from "./context/ContactsContext"
import { OrdersContextProvider } from "./context/OrdersContext"
import { ReceiptContextProvider } from "./context/ReceiptContext"
import { CssBaseline } from "@material-ui/core"
import AppNavigation from "./AppNavigation"
import { UserSettingsContextProvider } from "./context/UserSettingsContext"

function App() {
  return (
    <>
      <CssBaseline />
      <ContactsContextProvider>
        <ReceiptContextProvider>
          <OrdersContextProvider>
            <UserSettingsContextProvider>
              <AppNavigation />
            </UserSettingsContextProvider>
          </OrdersContextProvider>
        </ReceiptContextProvider>
      </ContactsContextProvider>
    </>
  )
}

export default App
