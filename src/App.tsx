import React from 'react'
import { ContactsContextProvider } from './context/ContactsContext'
import { OrdersContextProvider } from './context/OrdersContext'
import { ShoppingListContextProvider } from './context/ShoppingListContext'
import { CssBaseline } from '@material-ui/core'
import AppNavigation from './AppNavigation'


function App() {
  return (
    <>
      <CssBaseline/>
      <ContactsContextProvider>
        <ShoppingListContextProvider>
            <OrdersContextProvider>
                <AppNavigation/>
            </OrdersContextProvider>
        </ShoppingListContextProvider>
      </ContactsContextProvider>
    </>
  );
}



export default App;
