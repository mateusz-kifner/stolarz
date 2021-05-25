import axios from "axios";
import React, { Reducer, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Action, OrderProps, OrdersReducer } from "./OrdersReducer";

type OrdersContextProps = {
  orders: OrderProps[];
  addOrder: (order: OrderProps) => void;
  setOrders: (order: OrderProps[]) => void;
  removeOrder: (id: number) => void;
  changeOrder: (order: OrderProps) => void;
};
const initialContext = {
  orders: [],
  setOrders: (order: OrderProps[]) => {},
  addOrder: (order: OrderProps) => {},
  removeOrder: (id: number) => {},
  changeOrder: (order: OrderProps) => {},
};

export const OrdersContext =
  React.createContext<OrdersContextProps>(initialContext);

type OrdersContextProviderProps = {
  children: import("react").ReactNode;
};

export function OrdersContextProvider(props: OrdersContextProviderProps) {
  const [orders, dispatchOrders] = useReducer<Reducer<OrderProps[], Action>>(
    OrdersReducer,
    []
  );
  const [storage, setStorage] = useLocalStorage<any>("orders", []);

  useEffect(() => {
    axios
      .get("/orders")
      .then((res) => {
        dispatchOrders({ type: "set", data: res.data });
      })
      .catch((err) => {
        console.log("orders load error");
      });
    // setOrders(
    //   storage.map((value: OrderProps) => {
    //     let date_of_issue: Date = new Date(value.date_of_issue);
    //     let est_date_of_completion: Date | null;
    //     let date_of_completion: Date | null;
    //     if (value.est_date_of_completion === null)
    //       est_date_of_completion = null;
    //     else est_date_of_completion = new Date(value.est_date_of_completion);
    //     if (value.date_of_completion === null) date_of_completion = null;
    //     else date_of_completion = new Date(value.date_of_completion);
    //     return {
    //       ...value,
    //       date_of_completion,
    //       est_date_of_completion,
    //       date_of_issue,
    //     };
    //   })
    // );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    //setStorage(orders);
  });

  const setOrders = (orders: OrderProps[]) => {
    //todo set orders
    dispatchOrders({ type: "set", data: orders });
  };

  const addOrder = (order: OrderProps) => {
    axios
      .post("/orders", order)
      .then((res) => dispatchOrders({ type: "add", data: res.data }))
      .catch((e) => console.log("contact add network error"));
  };
  const removeOrder = (id: number) => {
    axios
      .delete(`/orders/${id}`)
      .then((_) => dispatchOrders({ type: "remove", id: id }))
      .catch((e) => console.log("contact remove network error"));
  };
  const changeOrder = (order: OrderProps) => {
    axios
      .put(`/orders/${order.id}`, order)
      .then((res) => dispatchOrders({ type: "change", data: res.data }))
      .catch((e) => console.log("contact change network error"));
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        addOrder,
        removeOrder,
        changeOrder,
      }}
    >
      {props.children}
    </OrdersContext.Provider>
  );
}
