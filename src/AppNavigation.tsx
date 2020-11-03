import React, { useContext, useEffect } from 'react'
import BottomTabs from './components/BottomTabs'
import OrdersPage from './pages/Orders/OrdersPage'
import ShoppingListPage from './pages/ShoppingList/ShoppingListPage'
import FinancePage from './pages/Finance/FinancePage'
import TopBar from './components/TopBar'
import OrdersEdit from './pages/Orders/OrdersEdit'
import OrdersAdd from './pages/Orders/OrdersAdd'
import DataView from './components/DataView'
import { ContactsContext } from './context/ContactsContext'
import { OrdersContext } from './context/OrdersContext'
import { ShoppingListContext } from './context/ShoppingListContext'
import faker from 'faker'
import { makeStyles } from '@material-ui/core'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import ShoppingListAdd from './pages/ShoppingList/ShoppingListAdd'

const useStyles = makeStyles({
    app:{
      height:"100%",
      maxHeight:"100%",
      display:"flex",
      flexDirection:"column",
      overflow:"hidden"
    },
    content:{
      maxHeight:"100%",
      flexGrow:1,
      overflow:"hidden"
    },
    bottomNav:{
      // alignSelf:"flex-end",
    }
  });

function AppNavigation() {
    const classes = useStyles();
    // const {orders, addOrder, removeOrder, changeOrder} = useContext(OrdersContext);
    // const {contacts, addContact, removeContact, changeContact} = useContext(ContactsContext);
    // const {recipts, addRecipt, removeRecipt, changeRecipt} = useContext(ShoppingListContext);
    // // Fake Data
    // useEffect(()=>{
    //     addContact({id:0,name:"Jan",surname:"Kowalski",tel:"730 495 950",email:"test@gmail.com",is_good:true})
    //     addContact({id:1,name:"Adam",surname:"Nowak",tel:"730 123 950",email:"test1@gmail.com",is_good:true})
    //     addContact({id:2,name:"Kuba",surname:"Kowalski",tel:"730 434 950",email:"test2@gmail.com",is_good:false})
    //     addRecipt({id:0,order_id:0,budget:30000,completed:false,items:[{id:0,amount:10,name:"Wood 2x4"},{id:0,amount:1,name:"Glue"}]})
    //     addRecipt({id:1,order_id:1,budget:50000,completed:false,items:[{id:0,amount:10,name:"Wood Plank 2x2m"},{id:0,amount:30,name:"Screws 5cm"},{id:0,amount:100,name:"Screws 3cm"}]})
    //     addRecipt({id:2,order_id:2,budget:70000,completed:false,items:[{id:0,amount:10,name:"Wood Plank 1x4m"},{id:0,amount:50,name:"Screws 7cm"}]})
    //     addOrder({id:0,desc:"Krzesłox2",advance_value:10000,priceing_value:40000,is_price_paid:false,is_advance_paid:false,client_id:0,notes:"",est_date_of_completion:faker.date.future(),date_of_issue:faker.date.recent(),date_of_completion:null, is_anbandoned:false,is_completed:false,shopping_list_id:0})
    //     addOrder({id:1,desc:"Stół",advance_value:30000,priceing_value:60000,is_price_paid:false,is_advance_paid:true,client_id:1,notes:"Drewno z Lipy",est_date_of_completion:faker.date.future(),date_of_issue:faker.date.recent(),date_of_completion:null, is_anbandoned:false,is_completed:false,shopping_list_id:1})
    //     addOrder({id:2,desc:"Ławka",advance_value:40000,priceing_value:80000,is_price_paid:true,is_advance_paid:true,client_id:2,notes:"Zaokrąglone nogi",est_date_of_completion:faker.date.future(),date_of_issue:faker.date.recent(),date_of_completion:null, is_anbandoned:false,is_completed:false,shopping_list_id:2})
    // },[])
    
    return (
        <BrowserRouter>
            <div className={classes.app}>
                <Route component={TopBar}/>
                <div className={classes.content}>
                    <Switch>
                        <Redirect path="/" to="/Orders" exact/>
                        <Route path="/Orders" exact component={OrdersPage}/>
                        <Route path="/Orders/Add" exact component={OrdersAdd}/>
                        <Route path="/Orders/Edit" component={OrdersEdit}/>
                        <Route path="/ShoppingList" exact component={ShoppingListPage}/>
                        <Route path="/ShoppingList/Add" exact component={ShoppingListAdd}/>
                        <Route path="/Finances" exact component={FinancePage}/>
                        <Route path="/DataView" exact component={DataView}/>
                        <Route path="/" render={()=>(<div>404</div>)}/>
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
