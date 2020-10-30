import React from 'react';
import { ContactsContextProvider } from './context/ContactsContext';
import { OrdersContextProvider } from './context/OrdersContext';
import { ShoppingListContextProvider } from './context/ShoppingListContext';
import DataView from './components/DataView'
import { CssBaseline, Grid, makeStyles } from '@material-ui/core';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import BottomTabs from './components/BottomTabs';
import OrdersPage from './pages/Orders/OrdersPage';
import ShoppingListPage from './pages/ShoppingList/ShoppingListPage';
import FinancePage from './pages/Finance/FinancePage';

const useStyles = makeStyles({
  app:{
    height:"100%",
  },
});

function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline/>
      <ContactsContextProvider>
        <ShoppingListContextProvider>
            <OrdersContextProvider>
              <BrowserRouter>
                <Grid container direction="column" className={classes.app}>
                  <Grid item xs>
                    <Switch>
                      <Redirect path="/" to="/Orders" exact/>
                      <Route path="/Orders" component={OrdersPage}/>
                      <Route path="/ShoppingList" component={ShoppingListPage}/>
                      <Route path="/Finances" component={FinancePage}/>
                      <Route path="/DataView" component={DataView}/>
                    </Switch>
                  </Grid>
                  <Grid item>
                    <Route component={BottomTabs}/>
                  </Grid>
                </Grid>
              </BrowserRouter>
            </OrdersContextProvider>
        </ShoppingListContextProvider>
      </ContactsContextProvider>
    </>
  );
}



export default App;
