import React from "react"
import { ContactsContextProvider } from "./context/ContactsContext"
import { OrdersContextProvider } from "./context/OrdersContext"
import { ReceiptContextProvider } from "./context/ReceiptContext"
import { CssBaseline, ThemeProvider } from "@material-ui/core"
import AppNavigation from "./AppNavigation"
import { UserSettingsContextProvider } from "./context/UserSettingsContext"
import lightTheme from "./themes/light"

function App() {
  return (
    <>
      <CssBaseline />
      <ContactsContextProvider>
        <ReceiptContextProvider>
          <OrdersContextProvider>
            <UserSettingsContextProvider>
              <ThemeProvider theme={lightTheme}>
                <AppNavigation />
              </ThemeProvider>
            </UserSettingsContextProvider>
          </OrdersContextProvider>
        </ReceiptContextProvider>
      </ContactsContextProvider>
    </>
  )
}

export default App
