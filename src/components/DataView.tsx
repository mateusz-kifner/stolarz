import React, { useContext, useEffect } from 'react';
import { ContactsContext, ContactsContextProvider } from '../context/ContactsContext';
import { OrdersContext, OrdersContextProvider } from '../context/OrdersContext';
import { ShoppingListContext, ShoppingListContextProvider } from '../context/ShoppingListContext';

function DataView(){
  const {recipts} = useContext(ShoppingListContext)
  const {orders} = useContext(OrdersContext)
  const {contacts} = useContext(ContactsContext)

  
  return (
    <>
    <h1>List</h1>
    <table>
      {recipts.map((value)=>{
        return(
        <tr>
          <td>{value.id}</td>
          <td>{value.budget}</td>
          <td>{value.items.map((value2)=>(`${value2.name} : ${value2.amount}, `))}</td>
          <td>{value.completed?"true":"false"}</td>
        </tr>
        )
      })}
    </table>
    <h1>contact</h1>
    <table>
      {contacts.map((value)=>{
        return(
        <tr>
          <td>{value.id}</td>
          <td>{value.name}</td>
          <td>{value.surname}</td>
          <td>{value.email}</td>
          <td>{value.tel}</td>
          <td>{value.is_good?"true":"false"}</td>
        </tr>
        )
      })}
    </table>
    <h1>Order</h1>
    <table>
      {orders.map((value)=>{
        return(
        <tr>
          <td>{value.id}</td>
          <td>{value.desc}</td>
          <td>{value.notes}</td>

          <td>{value.advance_value}</td>
          <td>{value.is_advance_paid?"true":"false"}</td>

          <td>{value.priceing_value}</td>
          <td>{value.is_price_paid?"true":"false"}</td>

          <td>{value.client_id}</td>
          <td>{value.shopping_list_id}</td>

          <td>{value.date_of_issue.toLocaleString()}</td>
          <td>{value.est_date_of_completion && value.est_date_of_completion.toLocaleString()}</td>
          <td>{value.date_of_completion && value.date_of_completion.toLocaleString()}</td>

          <td>{value.is_completed?"true":"false"}</td>
          <td>{value.is_anbandoned?"true":"false"}</td>
        </tr>
        )
      })}
    </table>
    </>
  )
}

export default DataView;
