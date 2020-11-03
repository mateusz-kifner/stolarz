import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import { ContactsContext } from '../../context/ContactsContext';
import { OrdersContext } from '../../context/OrdersContext';
import { ShoppingListContext } from '../../context/ShoppingListContext';

function SettingsPage() {
    const {orders, setOrders, addOrder, removeOrder, changeOrder} = useContext(OrdersContext);
    const {contacts, setContacts, addContact, removeContact, changeContact} = useContext(ContactsContext);
    const {recipts, setRecipts, addRecipt, removeRecipt, changeRecipt} = useContext(ShoppingListContext);

    // Fake Data
    const setFakeData = ()=>{
        resetAll()
        addContact({id:0,name:"Jan",surname:"Kowalski",tel:"730 495 950",email:"test@gmail.com",is_good:true})
        addContact({id:1,name:"Adam",surname:"Nowak",tel:"730 123 950",email:"test1@gmail.com",is_good:true})
        addContact({id:2,name:"Kuba",surname:"Kowalski",tel:"730 434 950",email:"test2@gmail.com",is_good:false})
        addRecipt({id:0,name:"test0",order_id:0,budget:30000,completed:false,items:[{id:0,amount:10,name:"Wood 2x4"},{id:0,amount:1,name:"Glue"}]})
        addRecipt({id:1,name:"test1",order_id:1,budget:50000,completed:false,items:[{id:0,amount:10,name:"Wood Plank 2x2m"},{id:0,amount:30,name:"Screws 5cm"},{id:0,amount:100,name:"Screws 3cm"}]})
        addRecipt({id:2,name:"test2",order_id:2,budget:70000,completed:false,items:[{id:0,amount:10,name:"Wood Plank 1x4m"},{id:0,amount:50,name:"Screws 7cm"}]})
        addOrder({id:0,desc:"Krzesłox2",advance_value:10000,priceing_value:40000,is_price_paid:false,is_advance_paid:false,client_id:0,notes:"",est_date_of_completion:faker.date.future(),date_of_issue:faker.date.recent(),date_of_completion:null, is_anbandoned:false,is_completed:false,shopping_list_id:0})
        addOrder({id:1,desc:"Stół",advance_value:30000,priceing_value:60000,is_price_paid:false,is_advance_paid:true,client_id:1,notes:"Drewno z Lipy",est_date_of_completion:faker.date.future(),date_of_issue:faker.date.recent(),date_of_completion:null, is_anbandoned:false,is_completed:false,shopping_list_id:1})
        addOrder({id:2,desc:"Ławka",advance_value:40000,priceing_value:80000,is_price_paid:true,is_advance_paid:true,client_id:2,notes:"Zaokrąglone nogi",est_date_of_completion:faker.date.future(),date_of_issue:faker.date.recent(),date_of_completion:null, is_anbandoned:false,is_completed:false,shopping_list_id:2})
    }


    const resetAll = ()=>{
        setOrders([])
        setRecipts([])
        setContacts([])
    }
    return (
        <div>
            <Button onClick={resetAll}>Remove all</Button>
            <Button onClick={setFakeData}>Set Fake Data</Button>
        </div>
    )
}

export default SettingsPage
