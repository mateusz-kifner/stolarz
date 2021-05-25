import axios from "axios";
import React, { useReducer, Reducer, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  Action,
  ReceiptItemProps,
  ReceiptProps,
  ReceiptReducer,
} from "./ReceiptReducer";

type ReceiptContextProps = {
  receipts: ReceiptProps[];
  setReceipts: (receipts: ReceiptProps[]) => void;
  addReceipt: (receipt: ReceiptProps) => void;
  removeReceipt: (id: number) => void;
  changeReceipt: (receipt: ReceiptProps) => void;
  addItem: (list_id: number, item_data: ReceiptItemProps) => void;
  changeItem: (list_id: number, item_data: ReceiptItemProps) => void;

  removeItem: (list_id: number, item_id: number) => void;
};

const initialContext = {
  receipts: [],
  setReceipts: (receipts: ReceiptProps[]) => {},
  addReceipt: (receipt: ReceiptProps) => {},
  removeReceipt: (id: number) => {},
  changeReceipt: (receipt: ReceiptProps) => {},
  addItem: (list_id: number, item_data: ReceiptItemProps) => {},
  changeItem: (list_id: number, item_data: ReceiptItemProps) => {},
  removeItem: (list_id: number, item_id: number) => {},
};

export const ReceiptContext =
  React.createContext<ReceiptContextProps>(initialContext);

type ReceiptContextProviderProps = {
  children: import("react").ReactNode;
};

export function ReceiptContextProvider(props: ReceiptContextProviderProps) {
  const [receipts, dispatchReceipts] = useReducer<
    Reducer<ReceiptProps[], Action>
  >(ReceiptReducer, []);
  const [storage, setStorage] = useLocalStorage<any>("receipt", []);

  useEffect(() => {
    axios
      .get("/receipts")
      .then((res) => {
        dispatchReceipts({ type: "setReceipts", data: res.data });
      })
      .catch((err) => {});
    //setReceipts(storage);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    //setStorage(receipts);
  });

  const setReceipts = (receipts: ReceiptProps[]) => {
    //todo set receipts
    dispatchReceipts({ type: "setReceipts", data: receipts });
  };

  const addReceipt = (receipt: ReceiptProps) => {
    axios
      .post("/receipts", receipt)
      .then((res) => dispatchReceipts({ type: "addReceipt", data: res.data }))
      .catch((e) => console.log("receipts add network error", e.message));
  };
  const removeReceipt = (id: number) => {
    axios
      .delete(`/receipts/${id}`)
      .then((_) => dispatchReceipts({ type: "removeReceipt", list_id: id }))
      .catch((e) => console.log("receipts remove network error"));
  };
  const changeReceipt = (receipt: ReceiptProps) => {
    axios
      .put(`/receipts/${receipt.id}`, receipt)
      .then((res) => {
        dispatchReceipts({ type: "changeReceipt", list_data: res.data });
      })
      .catch((e) => console.log("receipts change network error"));
  };

  const addItem = (list_id: number, item_data: ReceiptItemProps) => {
    console.log("UNSUPORTED addItem");

    //UNSUPORTED
    // var receipts_to_update = receipts.map((receipt) => {
    //   if (receipt.id === list_id) {
    //     console.log(receipt);
    //     let new_receipt = { ...receipt };
    //     new_receipt.items = [...receipt.items];
    //     if (item_data.id === undefined) item_data.id = receipt.items.length;
    //     if (item_data.is_bought === undefined) item_data.is_bought = false;
    //     new_receipt.items.push(item_data);
    //     let sum_of_bougth_items = new_receipt.items
    //       .map((val) => (val.is_bought ? 1 : 0))
    //       .reduce((prevVal: number, val: number) => prevVal + val, 0);
    //     if (sum_of_bougth_items === new_receipt.items.length)
    //       new_receipt.completed = true;
    //     else new_receipt.completed = false;
    //     return new_receipt;
    //   }
    //   return receipt;
    // });
    // console.log(receipts_to_update);
    // // axios
    // //   .put(`/receipts/${receipt.id}`, receipt)
    // //   .then((res) => {
    // //     dispatchReceipts({ type: "changeReceipt", list_data: res.data });
    // //   })
    // //   .catch((e) => console.log("receipts change network error"));
    // dispatchReceipts({ type: "addItem", list_id, item_data });
  };

  const changeItem = (list_id: number, item_data: ReceiptItemProps) => {
    let new_receipt: ReceiptProps;
    let receipt = receipts[list_id];

    new_receipt = { ...receipt };
    new_receipt.items = [...receipt.items];
    let id: number = (item_data as { id: number } & ReceiptItemProps).id;
    new_receipt.items[id] = item_data;
    let sum_of_bougth_items = new_receipt.items
      .map((val) => (val.is_bought ? 1 : 0))
      .reduce((prevVal: number, val: number) => prevVal + val, 0);
    if (sum_of_bougth_items === new_receipt.items.length)
      new_receipt.completed = true;
    else new_receipt.completed = false;

    axios
      .put(`/receipts/${new_receipt.id}`, new_receipt)
      .then((res) => {
        dispatchReceipts({ type: "addReceipt", data: res.data });
      })
      .catch((e) => console.log("receipts change network error"));
  };

  const removeItem = (list_id: number, item_id: number) => {
    console.log("UNSUPORTED removeItem");
    //UNSUPORTED
    // dispatchReceipts({ type: "removeItem", list_id, item_id });
  };

  return (
    <ReceiptContext.Provider
      value={{
        receipts,
        setReceipts,
        addReceipt,
        removeReceipt,
        changeReceipt,
        addItem,
        changeItem,
        removeItem,
      }}
    >
      {props.children}
    </ReceiptContext.Provider>
  );
}
